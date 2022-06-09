import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface ICreateClientAndShip {
  pilot_certification: string;
  name: string;
  age: number;
  credits: number;
  location_planet: string;
}

export class CreatePilotUseCase {
  async execute({
    pilot_certification,
    name,
    age,
    credits,
    location_planet,
  }: ICreateClientAndShip) {
    const minimumAge = 18; // minimum age for a pilot to fly
    if (age < minimumAge) {
      throw new AppError("age must be greater than 18");
    }

    const pilot = await prisma.pilot.create({
      data: {
        pilot_certification,
        name,
        age,
        credits,
        location_planet,
      },
    });
    return pilot;
  }
}
