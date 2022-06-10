import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";

interface IAcceptContract {
  id: string;
  pilot_certification: string;
}

export class AccecptContractsUseCase {
  async execute({ id, pilot_certification }: IAcceptContract) {
    const pilot = await prisma.pilot.findUnique({
      where: {
        pilot_certification,
      },
    });

    if (!pilot) {
      throw new AppError("pilot not found");
    }

    const contracExist = await prisma.contracts.findUnique({
      where: {
        id,
      },
    });

    if (!contracExist) {
      throw new AppError("contract not found");
    }

    const ship = await prisma.ship.findUnique({
      where: {
        pilot_id: pilot.id,
      },
    });
    if (!ship) {
      throw new AppError("ship not found");
    }

    const routes = await prisma.travel.findFirst({
      where: {
        origin_planet: contracExist.origin_planet,
        destination_planet: contracExist.destination_planet,
      },
    });
    if (!routes) {
      throw new AppError("route not found");
    }

    if (ship.fuel_level <= routes.fuel_consumption) {
      throw new AppError("The fuel is not enough to travel");
    }

    const acceptedContract = await prisma.contracts.findUnique({
      where: {
        id,
      },
    });

    if (acceptedContract?.pilot_id !== null) {
      throw new AppError("The contract is already accepted");
    }

    const contract = await prisma.contracts.update({
      where: {
        id,
      },
      data: {
        pilot_id: pilot.id,
      },
    });

    return contract;
  }
}
