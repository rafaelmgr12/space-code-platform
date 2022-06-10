import { Router } from "express";

import { AccecptContractsController } from "./modules/contracts/acceptContracts/AcceptContractController";
import { ListOpenContractsController } from "./modules/contracts/listOpenContracts/ListOpenCotractsController";
import { PublishContractController } from "./modules/contracts/useCase/publishContract/PublishContractController";
import { TravelPlanetsController } from "./modules/pilot/travel/useCase/TravelPlanetsController";
import { CreatePilotController } from "./modules/pilot/useCase/createPilotaAndShip/CreatePilotController";
import { CreateShipController } from "./modules/ship/useCase/CreateShipController";

const routes = Router();

const createPilotController = new CreatePilotController();
const createShipController = new CreateShipController();
const publishContractController = new PublishContractController();

const travelPlanetsController = new TravelPlanetsController();
const listOpenContracts = new ListOpenContractsController();

const acceptContractController = new AccecptContractsController();

routes.post("/pilot/", createPilotController.handle);
routes.post("/ship/", createShipController.handle);
routes.post("/contracts/", publishContractController.handle);

routes.put("/contracts/accept/", acceptContractController.handle);

routes.get("/travel/", travelPlanetsController.handle);
routes.get("/listopencontracts/", listOpenContracts.handle);
export { routes };
