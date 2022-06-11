import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IRefil {
  pilot_certification: string;
  quantity: number;
}

export class RefilFuelUseCase {
  async execute({ pilot_certification, quantity }: IRefil) {
    const pilot = await prisma.pilot.findUnique({
      where: {
        pilot_certification,
      },
    });
    if (!pilot) {
      throw new AppError("pilot not found");
    }
    const ship = await prisma.ship.findUnique({
      where: {
        pilot_id: pilot.id,
      },
    });
    if (!ship) {
      throw new AppError("ship not found");
    }

    if (ship.fuel_capacity === ship.fuel_level) {
      throw new AppError("ship is full");
    }
    if (quantity > ship.fuel_capacity) {
      throw new AppError("quantity is greater than capacity");
    }

    const unitFuel = 7; // cost to refil fuel
    if (pilot.credits < unitFuel * quantity) {
      throw new AppError("Not enough credits");
    }
    await prisma.pilot.update({
      where: {
        id: pilot.id,
      },
      data: {
        credits: pilot.credits - unitFuel * quantity,
      },
    });

    await prisma.trasaction.create({
      data: {
        description: `${pilot.name} bought fuel: +₭${unitFuel * quantity}`,
      },
    });

    const refilFuel = await prisma.ship.update({
      where: {
        pilot_id: pilot.id,
      },
      data: {
        fuel_level: ship.fuel_capacity,
      },
    });
    return refilFuel;
  }
}
