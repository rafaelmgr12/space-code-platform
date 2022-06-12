import { prisma } from "../src/database/prismaClient";
import { AppError } from "../src/errors/AppError";
import { PublishContractUseCase } from "../src/modules/contracts/useCase/publishContract/PublishContractUseCase";

let publishContractUseCase: PublishContractUseCase;

describe("Contracts Use Case", () => {
  beforeEach(() => {
    publishContractUseCase = new PublishContractUseCase();
  });
  it("Should be able to  publish a contract", async () => {
    const contract = await publishContractUseCase.execute({
      description: "test",
      payload: "test",
      origin_planet: "Demeter",
      destination_planet: "Calas",
      value: 100,
      weight: "1",
    });
    expect(contract).toHaveProperty("id");
    await prisma.contracts.delete({
      where: {
        id: contract.id,
      },
    });
  });

  it("Should no be able to publish a contract with a invalid route", async () => {
    await expect(
      publishContractUseCase.execute({
        description: "test",
        payload: "test",
        origin_planet: "Demeter",
        destination_planet: "Andvari",
        value: 100,
        weight: "1",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
