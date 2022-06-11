import { Request, Response } from "express";

import { RefilFuelUseCase } from "./RefilFuelUseCase";

export class RefilFuelController {
  async handle(request: Request, response: Response) {
    const { pilot_certification } = request.body;

    const refilFuelUseCase = new RefilFuelUseCase();
    const result = await refilFuelUseCase.execute({
      pilot_certification,
    });
    return response.json(result);
  }
}
