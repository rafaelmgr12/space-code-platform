import { Router } from "express";

import { CreatePilotAndShipController } from "./modules/pilot/useCase/createPilotaAndShip/CreatePilotAndShipController";

const routes = Router();

const createPilotAndShipController = new CreatePilotAndShipController();

routes.post("/pilot/", createPilotAndShipController.handle);

export { routes };
