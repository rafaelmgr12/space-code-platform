import { Request, Response } from "express";

import { ListOpenContracts } from "./ListOpenCotractsuseCase";

export class ListOpenContractsController {
  async handle(request: Request, response: Response) {
    const listOpenContracts = new ListOpenContracts();
    const result = await listOpenContracts.execute();

    return response.json(result);
  }
}
