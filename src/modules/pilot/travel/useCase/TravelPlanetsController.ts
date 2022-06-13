import { Request, Response } from "express";

import { TravelPlanetsUseCase } from "./TravelPlanetsUseCase";

export class TravelPlanetsController {
  async handle(request: Request, response: Response) {
    const { origin_planet, destination_planet, pilot_certification } =
      request.body;

    const travelPlanetsUseCase = new TravelPlanetsUseCase();
    const result = await travelPlanetsUseCase.execute({
      origin_planet,
      destination_planet,
      pilot_certification,
    });
    return response.json(result);
  }
}
