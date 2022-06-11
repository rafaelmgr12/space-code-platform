import { Request, Response } from "express";

import { RefilFuelUseCase } from "./RefilFuelUseCase";

export class RefilFuelController {
  async handle(request: Request, response: Response) {
    const { pilot_certification, quantity } = request.body;

    const refilFuelUseCase = new RefilFuelUseCase();
    const result = await refilFuelUseCase.execute({
      pilot_certification,
      quantity,
    });
    return response.json(result);
  }
}
