import { prisma } from "../../../database/prismaClient";

export class ListOpenContracts {
  async execute() {
    const listOpenContracts = await prisma.contracts.findMany({
      where: {
        pilot_id: null,
        end_at: null,
      },
    });
    return listOpenContracts;
  }
}
