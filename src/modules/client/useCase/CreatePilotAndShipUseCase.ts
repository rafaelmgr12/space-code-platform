import { prisma } from "../../../database/prismaClient";

interface ICreateClientAndShip {
  pilot_certification: string;
  name: string;
  age: number;
  credits: number;
  location_planet: string;
  ship_id?: string;
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
    ship_id,
    fuel_capacity,
    fuel_level,
    weight_capacity,
  }: ICreateClientAndShip) {
    const minimumAge = 18; // minimum age for a pilot to fly
    if (age < minimumAge) {
      throw new Error("age must be greater than 18");
    }

    const pilot = await prisma.pilot.create({
      data: {
        pilot_certification,
        name,
        age,
        credits,
        location_planet,
        ship_id,
        ship: {
          create: {
            fuel_capacity,
            fuel_level,
            weight_capacity,
          },
        },
      },
    });
    return pilot;
  }
}
