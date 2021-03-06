import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IFinishTransport {
  id: string;
  pilot_certification: string;
}

export class FinishTranportContractUseCase {
  async execute({ id, pilot_certification }: IFinishTransport) {
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

    const checkPilotAssing = await prisma.contracts.findFirst({
      where: {
        pilot_id: pilot.id,
      },
    });
    if (!checkPilotAssing) {
      throw new AppError("pilot not assing");
    }

    const contract = await prisma.contracts.update({
      where: {
        id,
      },
      data: {
        end_at: new Date(),
      },
    });

    const route = await prisma.travel.findFirst({
      where: {
        origin_planet: contract.origin_planet,
        destination_planet: contract.destination_planet,
      },
    });
    if (!route) {
      throw new AppError("route not found");
    }
    const fuelBalance = ship.fuel_level - route.fuel_consumption;

    await prisma.ship.update({
      where: {
        pilot_id: pilot.id,
      },
      data: {
        fuel_level: fuelBalance,
      },
    });

    await prisma.trasaction.create({
      data: {
        description: `Contract ${contract.id} ${contract.description} paid: -₭${contract.value}`,
      },
    });

    const pilotBalance = pilot.credits + contract.value;
    await prisma.pilot.update({
      where: {
        id: pilot.id,
      },
      data: {
        credits: pilotBalance,
      },
    });

    return contract;
  }
}
