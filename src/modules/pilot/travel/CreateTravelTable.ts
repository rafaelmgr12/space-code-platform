import { prisma } from "../../../database/prismaClient";

function getCollum(matrix: Array<Array<string>>, col: number) {
  const column = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col]);
  }
  return column; // return column data..
}

export class CreateTravelTable {
  static async create() {
    const planet = ["Andvari", "Demeter", "Aqua", "Calas"];

    const planetCombination = planet.flatMap((x) => planet.map((y) => [x, y]));

    const Travel = {
      origin_planet: getCollum(planetCombination, 0),
      destination_planet: getCollum(planetCombination, 1),
      fuel_consumption: [
        0, 0, 0, 20, 0, 0, 30, 25, 13, 22, 0, 15, 23, 25, 12, 0,
      ],
      route: [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0].map((x) =>
        Boolean(x)
      ),
    };
    const final = Travel.origin_planet.map((x, i) => ({
      origin_planet: x,
      destination_planet: Travel.destination_planet[i],
      fuel_consumption: Travel.fuel_consumption[i],
      route: Travel.route[i],
    }));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < final.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await prisma.travel.create({
        data: final[i],
      });
    }
  }
}
