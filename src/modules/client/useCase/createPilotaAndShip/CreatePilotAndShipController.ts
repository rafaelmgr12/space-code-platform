import { Request, Response } from "express";

import { CreatePilotAndShipUseCase } from "./CreatePilotAndShipUseCase";

export class CreatePilotAndShipController {
  async handle(request: Request, response: Response) {
    const {
      pilot_certification,
      name,
      age,
      credits,
      location_planet,
      fuel_capacity,
      fuel_level,
      weight_capacity,
    } = request.body;

    const createPilotUseCase = new CreatePilotAndShipUseCase();
    const result = await createPilotUseCase.execute({
      pilot_certification,
      name,
      age,
      credits,
      location_planet,
      fuel_capacity,
      fuel_level,
      weight_capacity,
    });
    return response.json(result);
  }
}
