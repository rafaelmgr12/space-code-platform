import { Request, Response } from "express";

import { PercentageUseByPilotUseCase } from "./PercentageUseByPilotUseCase";

export class PercentageUseByPilotController {
  async handle(request: Request, response: Response) {
    const { pilot_certification } = request.body;

    const percentageUseByPilotUseCase = new PercentageUseByPilotUseCase();
    const result = await percentageUseByPilotUseCase.execute({
      pilot_certification,
    });

    return response.json(result);
  }
}
