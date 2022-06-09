import { prisma } from "../src/database/prismaClient";
import { AppError } from "../src/errors/AppError";
import { CreatePilotUseCase } from "../src/modules/pilot/useCase/createPilotaAndShip/CreatePilotUseCase";

let createPilotUseCase: CreatePilotUseCase;

describe("Create Pilot and Ship", () => {
  beforeEach(() => {
    createPilotUseCase = new CreatePilotUseCase();
  });
  it("Should be able to create a new Pilot and Ship", async () => {
    const result = await createPilotUseCase.execute({
      pilot_certification: "111111",
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
  it("Should not be able to create a new Pilot and Ship", async () => {
    expect(async () => {
      await createPilotUseCase.execute({
        pilot_certification: "111111",
        name: "Matheus",
        age: 16,
        credits: 1421412,
        location_planet: "calahas",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
