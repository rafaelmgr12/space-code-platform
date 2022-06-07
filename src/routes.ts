import { Router } from "express";

import { CreatePilotAndShipController } from "./modules/client/useCase/CreatePilotAndShipController";

const routes = Router();

const createPilotAndShipController = new CreatePilotAndShipController();

routes.post("/pilot/", createPilotAndShipController.handle);

export { routes };
