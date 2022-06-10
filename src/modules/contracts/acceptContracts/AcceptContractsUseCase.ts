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
