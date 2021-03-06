import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";

import swaggerUI from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { routes } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use(
  "/api-docs",
  swaggerUI.serve,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  swaggerUI.setup(swaggerFile)
);

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error-${err.message}`,
    });
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
