import { Request, Response } from "express";

import { AccecptContractsUseCase } from "./AcceptContractsUseCase";

export class AccecptContractsController {
  async handle(request: Request, response: Response) {
    const { id, pilot_certification } = request.body;

    const acceptContractsUseCase = new AccecptContractsUseCase();
    const result = await acceptContractsUseCase.execute({
      id,
      pilot_certification,
    });

    return response.json(result);
  }
}
