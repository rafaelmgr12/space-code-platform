import { Request, Response } from "express";

import { CreatePilotAndShipUseCase } from "./CreatePilotUseCase";

export class CreatePilotAndShipController {
  async handle(request: Request, response: Response) {
    const { pilot_certification, name, age, credits, location_planet } =
      request.body;

    const createPilotUseCase = new CreatePilotAndShipUseCase();
    const result = await createPilotUseCase.execute({
      pilot_certification,
      name,
      age,
      credits,
      location_planet,
    });
    return response.json(result);
  }
}
