import { Request, Response } from "express";

import { TotalWeighByPlanetUseCase } from "./TotalWeighByPlanetUseCase";

export class TotalWeighByPlanetController {
  async handle(request: Request, response: Response) {
    const { planet_name } = request.body;

    const totalWeighByPlanetUseCase = new TotalWeighByPlanetUseCase();
    const result = await totalWeighByPlanetUseCase.execute({ planet_name });

    return response.json(result);
  }
}
