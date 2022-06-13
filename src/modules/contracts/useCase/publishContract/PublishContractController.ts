import { Request, Response } from "express";

import { PublishContractUseCase } from "./PublishContractUseCase";

export class PublishContractController {
  async handle(request: Request, response: Response) {
    const {
      description,
      payload,
      origin_planet,
      destination_planet,
      value,
      weight,
    } = request.body;

    const publishContractUseCase = new PublishContractUseCase();
    const result = await publishContractUseCase.execute({
      description,
      payload,
      origin_planet,
      destination_planet,
      value,
      weight,
    });
    return response.json(result);
  }
}
