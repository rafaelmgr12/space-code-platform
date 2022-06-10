import { prisma } from "../../../../database/prismaClient";

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
      throw new Error("pilot not found");
    }

    const ship = await prisma.ship.findUnique({
      where: {
        pilot_id: pilot.id,
      },
    });
    if (!ship) {
      throw new Error("ship not found");
    }

    const checkPilotAssing = await prisma.contracts.findFirst({
      where: {
        pilot_id: pilot.id,
      },
    });
    if (!checkPilotAssing) {
      throw new Error("pilot not assing");
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
      throw new Error("route not found");
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
