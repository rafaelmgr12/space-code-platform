import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

export interface ICreatePilot {
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
  }: ICreatePilot) {
    const minimumAge = 18; // minimum age for a pilot to fly
    const pilot_id = await prisma.pilot.findFirst({
      where: {
        pilot_certification,
      },
    });
    if (age < minimumAge) {
      throw new AppError("age must be greater than 18");
    }
    if (pilot_id) {
      throw new AppError("pilot already exists");
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
