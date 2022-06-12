import { prisma } from "../src/database/prismaClient";
import { AppError } from "../src/errors/AppError";
import { AccecptContractsUseCase } from "../src/modules/contracts/acceptContracts/AcceptContractsUseCase";
import { PublishContractUseCase } from "../src/modules/contracts/useCase/publishContract/PublishContractUseCase";
import { FinishTranportContractUseCase } from "../src/modules/pilot/travel/finishTranportContract/FinishTranportContractUseCase";
import { CreatePilotUseCase } from "../src/modules/pilot/useCase/createPilot/CreatePilotUseCase";
import { CreateShipUseCase } from "../src/modules/ship/useCase/createShip/CreateShipUseCase";

let createPilotUseCase: CreatePilotUseCase;
let finishTranportContractUseCase: FinishTranportContractUseCase;
let publishContractUseCase: PublishContractUseCase;
let acceptedContractUseCase: AccecptContractsUseCase;
let createShipUsecase: CreateShipUseCase;

describe("Contracts Use Case", () => {
  beforeEach(() => {
    createPilotUseCase = new CreatePilotUseCase();
    finishTranportContractUseCase = new FinishTranportContractUseCase();
    publishContractUseCase = new PublishContractUseCase();
    acceptedContractUseCase = new AccecptContractsUseCase();
    createShipUsecase = new CreateShipUseCase();
  });
  it("Should be able to  publish a contract", async () => {
    const contract = await publishContractUseCase.execute({
      description: "test",
      payload: "test",
      origin_planet: "Demeter",
      destination_planet: "Calas",
      value: 100,
      weight: "1",
    });
    expect(contract).toHaveProperty("id");
    await prisma.contracts.delete({
      where: {
        id: contract.id,
      },
    });
  });

  it("Should no be able to publish a contract with a invalid route", async () => {
    await expect(
      publishContractUseCase.execute({
        description: "test",
        payload: "test",
        origin_planet: "Demeter",
        destination_planet: "Andvari",
        value: 100,
        weight: "1",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
