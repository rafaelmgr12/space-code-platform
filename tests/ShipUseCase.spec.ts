import { prisma } from "../src/database/prismaClient";
import { AppError } from "../src/errors/AppError";
import { CreatePilotUseCase } from "../src/modules/pilot/useCase/createPilot/CreatePilotUseCase";
import { CreateShipUseCase } from "../src/modules/ship/useCase/createShip/CreateShipUseCase";

let createPilotUseCase: CreatePilotUseCase;

let createShipUsecase: CreateShipUseCase;

describe("Pilot Use Cases", () => {
  beforeEach(() => {
    createPilotUseCase = new CreatePilotUseCase();

    createShipUsecase = new CreateShipUseCase();
  });
  it("Should be able to add ship to a pilot", async () => {
    const pilot = await createPilotUseCase.execute({
      pilot_certification: "123",
      name: "Matheus",
      age: 19,
      credits: 1421412,
      location_planet: "calahas",
    });
    const ship = await await createShipUsecase.execute({
      fuel_capacity: 100,
      fuel_level: 50,
      weight_capacity: 100,
      pilot_certification: pilot.pilot_certification,
    });
    expect(ship).toHaveProperty("pilot_id", pilot.id);

    await prisma.pilot.delete({
      where: {
        id: pilot.id,
      },
    });
  });
  it("Should not be able to add ship to a pilot that already has a ship", async () => {
    const pilot = await createPilotUseCase.execute({
      pilot_certification: "123",
      name: "Matheus",
      age: 19,
      credits: 1421412,
      location_planet: "calahas",
    });
    const ship = await createShipUsecase.execute({
      fuel_capacity: 100,
      fuel_level: 50,
      weight_capacity: 100,
      pilot_certification: pilot.pilot_certification,
    });
    expect(ship).toHaveProperty("pilot_id", pilot.id);

    await expect(
      createShipUsecase.execute({
        fuel_capacity: 100,
        fuel_level: 50,
        weight_capacity: 100,
        pilot_certification: pilot.pilot_certification,
      })
    ).rejects.toBeInstanceOf(AppError);

    await prisma.pilot.delete({
      where: {
        id: pilot.id,
      },
    });
  });
});
