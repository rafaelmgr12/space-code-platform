import { Router } from "express";

import { PublishContractController } from "./modules/contracts/useCase/publishContract/PublishContractController";
import { TravelPlanetsController } from "./modules/pilot/travel/useCase/TravelPlanetsController";
import { CreatePilotController } from "./modules/pilot/useCase/createPilotaAndShip/CreatePilotController";
import { CreateShipController } from "./modules/ship/useCase/CreateShipController";

const routes = Router();

const createPilotController = new CreatePilotController();
const createShipController = new CreateShipController();
const publishContractController = new PublishContractController();

const travelPlanetsController = new TravelPlanetsController();

routes.post("/pilot/", createPilotController.handle);
routes.post("/ship/", createShipController.handle);
routes.post("/contracts/", publishContractController.handle);

routes.get("/travel/", travelPlanetsController.handle);

export { routes };
