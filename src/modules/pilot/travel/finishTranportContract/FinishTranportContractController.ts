import { Request, Response } from "express";

import { FinishTranportContractUseCase } from "./FinishTranportContractUseCase";

export class FinishTranportContractController {
  async handle(request: Request, response: Response) {
    const { id, pilot_certification } = request.body;

    const finishTranportContractUseCase = new FinishTranportContractUseCase();
    const result = await finishTranportContractUseCase.execute({
      id,
      pilot_certification,
    });
    return response.json(result);
  }
}
