import { prisma } from "../../../../database/prismaClient";

interface IContract {
  description: string;
  payload: string;
  origin_planet: string;
  destination_planet: string;
  value: number;
  weight: string;
}

export class PublishContractUseCase {
  async execute({
    description,
    payload,
    origin_planet,
    destination_planet,
    value,
    weight,
  }: IContract) {
    const resourceName = payload.split(",");
    const resourceWeight = weight.split(",");

    const resource = {
      name: resourceName.map((item) => item.trim()),
      weight: resourceWeight.map((item) => parseFloat(item.trim())),
    };

    const contract = await prisma.contracts.create({
      data: {
        description,
        payload,
        origin_planet,
        destination_planet,
        value,
        resources: {
          create: resource.name.map((item, index) => ({
            name: item,
            weight: resource.weight[index],
          })),
        },
      },
    });

    return contract;
  }
}
