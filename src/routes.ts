import { Router } from "express";

import { PublishContractController } from "./modules/contracts/useCase/publishContract/PublishContractController";
import { CreatePilotController } from "./modules/pilot/useCase/createPilotaAndShip/CreatePilotController";
import { CreateShipController } from "./modules/ship/useCase/CreateShipController";

const routes = Router();

const createPilotController = new CreatePilotController();
const createShipController = new CreateShipController();
const publishContractController = new PublishContractController();

routes.post("/pilot/", createPilotController.handle);
routes.post("/ship/", createShipController.handle);
routes.post("/contracts/", publishContractController.handle);

export { routes };
