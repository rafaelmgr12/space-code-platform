import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

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
    const routes = await prisma.travel.findFirst({
      where: {
        origin_planet,
        destination_planet,
      },
    });
    if (!routes) {
      throw new AppError("Routes not found");
    }

    if (routes.route === false) {
      throw new AppError("This Route are not possible");
    }

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
