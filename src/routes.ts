import { Router } from "express";

import { AccecptContractsController } from "./modules/contracts/acceptContracts/AcceptContractController";
import { ListOpenContractsController } from "./modules/contracts/listOpenContracts/ListOpenCotractsController";
import { PublishContractController } from "./modules/contracts/useCase/publishContract/PublishContractController";
import { FinishTranportContractController } from "./modules/pilot/travel/finishTranportContract/FinishTranportContractController";
import { TravelPlanetsController } from "./modules/pilot/travel/useCase/TravelPlanetsController";
import { CreatePilotController } from "./modules/pilot/useCase/createPilot/CreatePilotController";
import { CreateShipController } from "./modules/ship/useCase/createShip/CreateShipController";
import { RefilFuelController } from "./modules/ship/useCase/refilFuel/RefilFuelController";
import { PercentageUseByPilotController } from "./modules/summary/useCase/percentageUseByPilot/PercentageUseByPilotController";
import { TotalWeighByPlanetController } from "./modules/summary/useCase/totalWeighByPlanet/TotalWeighByPlanetController";
import { TransactionTableController } from "./modules/summary/useCase/transactionTable/TransactionTableController";

const routes = Router();

// post
const createPilotController = new CreatePilotController();
const createShipController = new CreateShipController();
const publishContractController = new PublishContractController();

// put
const acceptContractController = new AccecptContractsController();
const finishTranportContractController = new FinishTranportContractController();
const refilFuelController = new RefilFuelController();

// get
const travelPlanetsController = new TravelPlanetsController();
const listOpenContracts = new ListOpenContractsController();
const transactionTableController = new TransactionTableController();
const totalWeighByPlanetController = new TotalWeighByPlanetController();
const percentageUseByPilotController = new PercentageUseByPilotController();

routes.post("/pilot/", createPilotController.handle);
routes.post("/ship/", createShipController.handle);
routes.post("/contracts/", publishContractController.handle);

routes.put("/contracts/accept/", acceptContractController.handle);
routes.put("/contracts/close", finishTranportContractController.handle);
routes.put("/ship/refil", refilFuelController.handle);

routes.get("/travel/", travelPlanetsController.handle);
routes.get("/listopencontracts/", listOpenContracts.handle);
routes.get("/summary/table/", transactionTableController.handle);
routes.get("/summary/weightplanet", totalWeighByPlanetController.handle);
routes.get("/summary/percentage", percentageUseByPilotController.handle);

export { routes };
