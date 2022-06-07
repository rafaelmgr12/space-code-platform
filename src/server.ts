import express, { NextFunction, Request, Response } from "express";

import { routes } from "./routes";
import "express-async-errors";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      response.status(400).json({
        message: err.message,
      });
      next(err);
    }

    response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    next(err);
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
