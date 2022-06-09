import { Request, Response } from "express";

import { CreatePilotUseCase } from "./CreatePilotUseCase";

export class CreatePilotController {
  async handle(request: Request, response: Response) {
    const { pilot_certification, name, age, credits, location_planet } =
      request.body;

    const createPilotUseCase = new CreatePilotUseCase();
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
