import { prisma } from "../../../database/prismaClient";

export class ListOpenContracts {
  async execute() {
    const listOpenContracts = await prisma.contracts.findMany({
      where: {
        end_at: null,
      },
    });
    return listOpenContracts;
  }
}
