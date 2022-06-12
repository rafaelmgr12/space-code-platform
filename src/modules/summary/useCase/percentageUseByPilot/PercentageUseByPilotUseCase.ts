import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IPilot {
  pilot_certification: string;
}

export class PercentageUseByPilotUseCase {
  async execute({ pilot_certification }: IPilot) {
    const pilot = await prisma.pilot.findUnique({
      where: {
        pilot_certification,
      },
    });
    if (!pilot) {
      throw new AppError("Pilot not found");
    }
    const ship = await prisma.ship.findUnique({
      where: {
        pilot_id: pilot.id,
      },
    });
    if (!ship) {
      throw new AppError("Ship not found");
    }
    const contractByPilot = await prisma.contracts.findMany({
      where: {
        pilot_id: pilot.id,
        end_at: {
          not: null,
        },
      },
    });

    const resources = [];
    const idsContract = contractByPilot.map((item) => item.id);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < idsContract.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const queryResource = await prisma.resource.findMany({
        where: {
          contracts_id: idsContract[i],
        },
      });
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < queryResource.length; j++) {
        resources.push(queryResource[j]);
      }
    }
    console.log(resources);
    const totalWeight = resources.reduce((acc, item) => {
      return acc + item.weight;
    }, 0);
    console.log(totalWeight);
    const food = resources.reduce((acc, item) => {
      if (item.name === "food") {
        return acc + item.weight;
      }
      console.log(acc);
      return acc;
    }, 0);
    const water = resources.reduce((acc, item) => {
      if (item.name === "water") {
        return acc + item.weight;
      }
      return acc;
    }, 0);
    const minerals = resources.reduce((acc, item) => {
      if (item.name === "minerals") {
        return acc + item.weight;
      }
      return acc;
    }, 0);

    const summary = {
      [pilot.name]: {
        food: [(food / totalWeight) * 100],
        water: [(water / totalWeight) * 100],
        minerals: [(minerals / totalWeight) * 100],
      },
    };
    return summary;
  }
}
