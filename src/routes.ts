import { Router } from "express";

import { PublishContractController } from "./modules/contracts/useCase/publishContract/PublishContractController";
import { CreatePilotAndShipController } from "./modules/pilot/useCase/createPilotaAndShip/CreateController";

const routes = Router();

const createPilotAndShipController = new CreatePilotAndShipController();
const publishContractController = new PublishContractController();

routes.post("/pilot/", createPilotAndShipController.handle);
routes.post("/contracts/", publishContractController.handle);

export { routes };
