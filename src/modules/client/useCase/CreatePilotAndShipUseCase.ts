import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";

interface ICreateClientAndShip {
  pilot_certification: string;
  name: string;
  age: number;
  credits: number;
  location_planet: string;
  fuel_capacity: number;
  fuel_level: number;
  weight_capacity: number;
}

export class CreatePilotAndShipUseCase {
  async execute({
    pilot_certification,
    name,
    age,
    credits,
    location_planet,
    fuel_capacity,
    fuel_level,
    weight_capacity,
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
        Ship: {
          create: { fuel_capacity, fuel_level, weight_capacity },
        },
      },
    });
    return pilot;
  }
}
