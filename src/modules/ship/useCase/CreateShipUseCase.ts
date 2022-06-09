import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";

interface IShip {
  fuel_capacity: number;
  fuel_level: number;
  weight_capacity: number;
  pilot_certification: string;
  name: string;
}

export class CreateShipUseCase {
  async execute({
    fuel_capacity,
    fuel_level,
    weight_capacity,
    pilot_certification,
    name,
  }: IShip) {
    const pilot_id = await prisma.pilot.findFirst({
      where: {
        pilot_certification,
        name,
      },
    });
    if (!pilot_id) {
      throw new AppError("pilot not found");
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
