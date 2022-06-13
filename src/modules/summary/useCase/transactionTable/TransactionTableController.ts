import { Request, Response } from "express";

import { TransactionTableUseCase } from "./TransactionTableUseCase";

export class TransactionTableController {
  async handle(request: Request, response: Response) {
    const transactionTableUseCase = new TransactionTableUseCase();
    const result = await transactionTableUseCase.execute();

    return response.json(result);
  }
}
