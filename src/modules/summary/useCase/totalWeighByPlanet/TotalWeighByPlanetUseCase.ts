import { prisma } from "../../../../database/prismaClient";

interface IPlanet {
  planet_name: string;
}

export class TotalWeighByPlanetUseCase {
  async execute({ planet_name }: IPlanet) {
    const planetSent = await prisma.contracts.findMany({
      where: {
        origin_planet: planet_name,
        end_at: {
          not: null,
        },
      },
    });

    const resourcesSent = [];
    const idsPlanetSend = planetSent.map((item) => item.id);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < idsPlanetSend.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const queryResource = await prisma.resource.findMany({
        where: {
          contracts_id: idsPlanetSend[i],
        },
      });
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < queryResource.length; j++) {
        resourcesSent.push(queryResource[j]);
      }
    }

    const planeRecived = await prisma.contracts.findMany({
      where: {
        destination_planet: planet_name,
        end_at: {
          not: null,
        },
      },
    });

    const resourcesRecived = [];
    const idsPlanetRecived = planeRecived.map((item) => item.id);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < idsPlanetRecived.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const queryResource = await prisma.resource.findMany({
        where: {
          contracts_id: idsPlanetRecived[i],
        },
      });
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < queryResource.length; j++) {
        resourcesRecived.push(queryResource[j]);
      }
    }
    const summary = {
      [planet_name]: {
        sent: {
          food: resourcesSent.reduce((acc, item) => {
            if (item.name === "food") {
              return acc + item.weight;
            }
            return acc;
          }, 0),
          water: resourcesSent.reduce((acc, item) => {
            if (item.name === "water") {
              return acc + item.weight;
            }
            return acc;
          }, 0),
          minerals: resourcesSent.reduce((acc, item) => {
            if (item.name === "minerals") {
              return acc + item.weight;
            }
            return acc;
          }, 0),
        },
        recivied: {
          food: resourcesRecived.reduce((acc, item) => {
            if (item.name === "food") {
              return acc + item.weight;
            }
            return acc;
          }, 0),
          water: resourcesRecived.reduce((acc, item) => {
            if (item.name === "water") {
              return acc + item.weight;
            }
            return acc;
          }, 0),
          minerals: resourcesRecived.reduce((acc, item) => {
            if (item.name === "minerals") {
              return acc + item.weight;
            }
            return acc;
          }, 0),
        },
      },
    };

    return summary;
  }
}
