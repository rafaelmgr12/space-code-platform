import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { CreateTravelTable } from "../CreateTravelTable";

interface ITravel {
  origin_planet: string;
  destination_planet: string;
  pilot_certification: string;
}

export class TravelPlanetsUseCase {
  async execute({
    origin_planet,
    destination_planet,
    pilot_certification,
  }: ITravel) {
    const pilot = await prisma.pilot.findUnique({
      where: { pilot_certification },
    });
    if (!pilot) {
      throw new AppError("pilot not found");
    }
    const ship = await prisma.ship.findUnique({
      where: { pilot_id: pilot.id },
    });
    if (!ship) {
      throw new AppError("ship not found");
    }

    const travel = await prisma.travel.findMany();
    if (travel.length === 0) {
      CreateTravelTable.create();
    }
    const travelPlanets = await prisma.travel.findFirst({
      where: {
        origin_planet,
        destination_planet,
      },
    });
    if (!travelPlanets) {
      throw new AppError("route not found");
    }
    if (
      ship.fuel_level >= travelPlanets.fuel_consumption &&
      travelPlanets.route === true
    ) {
      return {
        message: `The travel between ${origin_planet} and ${destination_planet} is possible`,
      };
    }
    return {
      message: `The travel between ${origin_planet} and ${destination_planet} is not possible`,
    };
  }
}
