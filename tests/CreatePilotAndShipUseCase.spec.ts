import { prisma } from "../src/database/prismaClient";
import { AppError } from "../src/errors/AppError";
import { CreatePilotAndShipUseCase } from "../src/modules/client/useCase/CreatePilotAndShipUseCase";

let createPilotAndShipUseCase: CreatePilotAndShipUseCase;

describe("Create Pilot and Ship", () => {
  beforeEach(() => {
    createPilotAndShipUseCase = new CreatePilotAndShipUseCase();
  });
  it("Should be able to create a new Pilot and Ship", async () => {
    const result = await createPilotAndShipUseCase.execute({
      pilot_certification: "111111",
      name: "Matheus",
      age: 19,
      credits: 1421412,
      location_planet: "calahas",
      fuel_capacity: 100,
      fuel_level: 100,
      weight_capacity: 100,
    });

    expect(result).toHaveProperty("id");

    await prisma.pilot.delete({
      where: {
        id: result.id,
      },
    });
  });
  it("Should not be able to create a new Pilot and Ship", async () => {
    expect(async () => {
      await createPilotAndShipUseCase.execute({
        pilot_certification: "111111",
        name: "Matheus",
        age: 16,
        credits: 1421412,
        location_planet: "calahas",
        fuel_capacity: 100,
        fuel_level: 100,
        weight_capacity: 100,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
