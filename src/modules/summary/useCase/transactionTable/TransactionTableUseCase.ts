import { prisma } from "../../../../database/prismaClient";

export class TransactionTableUseCase {
  async execute() {
    const table = await prisma.trasaction.findMany({
      orderBy: [{ created_at: "desc" }],
    });
    return table;
  }
}
