import { Request, Response } from "express";

import { CreateShipUseCase } from "./CreateShipUseCase";

export class CreateShipController {
  async handle(request: Request, response: Response) {
    const {
      fuel_capacity,
      fuel_level,
      weight_capacity,
      pilot_certification,
      name,
    } = request.body;

    const createPilotUseCase = new CreateShipUseCase();
    const result = await createPilotUseCase.execute({
      fuel_capacity,
      fuel_level,
      weight_capacity,
      pilot_certification,
      name,
    });
    return response.json(result);
  }
}
