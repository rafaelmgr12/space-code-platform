import { prisma } from "../src/database/prismaClient";
import { AppError } from "../src/errors/AppError";
import { AccecptContractsUseCase } from "../src/modules/contracts/acceptContracts/AcceptContractsUseCase";
import { PublishContractUseCase } from "../src/modules/contracts/useCase/publishContract/PublishContractUseCase";
import { FinishTranportContractUseCase } from "../src/modules/pilot/travel/finishTranportContract/FinishTranportContractUseCase";
import { CreatePilotUseCase } from "../src/modules/pilot/useCase/createPilot/CreatePilotUseCase";
import { CreateShipUseCase } from "../src/modules/ship/useCase/createShip/CreateShipUseCase";
import { RefilFuelUseCase } from "../src/modules/ship/useCase/refilFuel/RefilFuelUseCase";

let createPilotUseCase: CreatePilotUseCase;
let finishTranportContractUseCase: FinishTranportContractUseCase;
let publishContractUseCase: PublishContractUseCase;
let acceptedContractUseCase: AccecptContractsUseCase;
let createShipUsecase: CreateShipUseCase;
let refilFuelUseCase: RefilFuelUseCase;

describe("Pilot Use Cases", () => {
  beforeEach(() => {
    createPilotUseCase = new CreatePilotUseCase();
    finishTranportContractUseCase = new FinishTranportContractUseCase();
    publishContractUseCase = new PublishContractUseCase();
    acceptedContractUseCase = new AccecptContractsUseCase();
    createShipUsecase = new CreateShipUseCase();
    refilFuelUseCase = new RefilFuelUseCase();
  });
  it("Should be able to create a new Pilot", async () => {
    const result = await createPilotUseCase.execute({
      pilot_certification: "123",
      name: "Matheus",
      age: 19,
      credits: 1421412,
      location_planet: "calahas",
    });

    expect(result).toHaveProperty("id");

    await prisma.pilot.delete({
      where: {
        id: result.id,
      },
    });
  });
  it("Should not be able to create a new Pilot with age less than 18", async () => {
    expect(async () => {
      await createPilotUseCase.execute({
        pilot_certification: "123",
        name: "Matheus",
        age: 16,
        credits: 1421412,
        location_planet: "calahas",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to create a Pilot that already exist", async () => {
    expect(async () => {
      await createPilotUseCase.execute({
        pilot_certification: "321",
        name: "Matheus",
        age: 16,
        credits: 1421412,
        location_planet: "calahas",
      });

      await createPilotUseCase.execute({
        pilot_certification: "321",
        name: "Matheus",
        age: 16,
        credits: 1421412,
        location_planet: "calahas",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Sould be able to refil ship ", async () => {
    const pilot = await createPilotUseCase.execute({
      pilot_certification: "4323123",
      name: "Pilot Test",
      age: 19,
      credits: 1421412,
      location_planet: "Calas",
    });
    let ship = await createShipUsecase.execute({
      fuel_capacity: 100,
      fuel_level: 50,
      weight_capacity: 100,
      pilot_certification: pilot.pilot_certification,
    });
    ship = await refilFuelUseCase.execute({
      pilot_certification: pilot.pilot_certification,
      quantity: 50,
    });
    expect(ship.fuel_level).toBe(100);
    await prisma.pilot.delete({
      where: {
        id: pilot.id,
      },
    });

    const result = await prisma.trasaction.findFirst({
      where: {
        description: {
          contains: `${pilot.name} bought fuel: +₭${7 * 50}`,
        },
      },
    });
    await prisma.trasaction.delete({
      where: {
        id: result?.id,
      },
    });
  });

  it("should be able to accept a contract", async () => {
    const pilot = await createPilotUseCase.execute({
      pilot_certification: "123",
      name: "Matheus",
      age: 19,
      credits: 1421412,
      location_planet: "Calas",
    });
    await createShipUsecase.execute({
      fuel_capacity: 100,
      fuel_level: 50,
      weight_capacity: 100,
      pilot_certification: pilot.pilot_certification,
    });
    let contract = await publishContractUseCase.execute({
      description: "test",
      payload: "test",
      origin_planet: "Demeter",
      destination_planet: "Calas",
      value: 100,
      weight: "1",
    });
    contract = await acceptedContractUseCase.execute({
      id: contract.id,
      pilot_certification: pilot.pilot_certification,
    });

    const queryPilot = contract.pilot_id != null;
    expect(queryPilot).toBeTruthy();

    await prisma.contracts.delete({
      where: {
        id: contract.id,
      },
    });
    await prisma.pilot.delete({
      where: {
        id: pilot.id,
      },
    });
  });
});

it("Should be able to finish a tranport contract", async () => {
  const pilot = await createPilotUseCase.execute({
    pilot_certification: "1211133",
    name: "test",
    age: 19,
    credits: 123,
    location_planet: "Calas",
  });

  await createShipUsecase.execute({
    fuel_capacity: 100,
    fuel_level: 100,
    weight_capacity: 100,
    pilot_certification: pilot.pilot_certification,
  });

  let contract = await publishContractUseCase.execute({
    description: "test",
    payload: "test",
    origin_planet: "Demeter",
    destination_planet: "Calas",
    value: 100,
    weight: "1",
  });

  contract = await acceptedContractUseCase.execute({
    id: contract.id,
    pilot_certification: pilot.pilot_certification,
  });

  contract = await finishTranportContractUseCase.execute({
    id: contract.id,
    pilot_certification: pilot.pilot_certification,
  });

  const queryDate = contract.end_at != null;
  expect(queryDate).toBeTruthy();

  await prisma.contracts.delete({
    where: {
      id: contract.id,
    },
  });
  await prisma.pilot.delete({
    where: {
      id: pilot.id,
    },
  });
  const result = await prisma.trasaction.findFirst({
    where: {
      description: {
        contains: `Contract ${contract.id} ${contract.description} paid: -₭${contract.value}`,
      },
    },
  });
  await prisma.trasaction.delete({
    where: {
      id: result?.id,
    },
  });
});
