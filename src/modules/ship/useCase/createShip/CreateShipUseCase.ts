import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IShip {
  fuel_capacity: number;
  fuel_level: number;
  weight_capacity: number;
  pilot_certification: string;
}

export class CreateShipUseCase {
  async execute({
    fuel_capacity,
    fuel_level,
    weight_capacity,
    pilot_certification,
  }: IShip) {
    const pilot_id = await prisma.pilot.findUnique({
      where: {
        pilot_certification,
      },
    });
    if (!pilot_id) {
      throw new AppError("pilot not found");
    }

    const checkShipAlreadyExist = await prisma.ship.findUnique({
      where: {
        pilot_id: pilot_id.id,
      },
    });
    if (checkShipAlreadyExist) {
      throw new AppError("ship already exist");
    }

    const ship = await prisma.ship.create({
      data: {
        fuel_capacity,
        fuel_level,
        weight_capacity,
        pilot: {
          connect: {
            id: pilot_id.id,
          },
        },
      },
    });
    return ship;
  }
}
