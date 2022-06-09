import { prisma } from "../../../../database/prismaClient";

interface IContract {
  description: string;
  payload: string;
  origin_planet: string;
  destination_planet: string;
  value: number;
}

export class PublishContractUseCase {
  async execute({
    description,
    payload,
    origin_planet,
    destination_planet,
    value,
  }: IContract) {
    const contract = await prisma.contracts.create({
      data: {
        description,
        payload,
        origin_planet,
        destination_planet,
        value,
      },
    });

    return contract;
  }
}
