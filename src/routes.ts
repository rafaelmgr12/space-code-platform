import { Router } from "express";

import { CreatePilotController } from "./modules/client/createPilot/CreatePilotController";

const routes = Router();

const createPilotController = new CreatePilotController();

routes.post("/pilot/", createPilotController.handle);

export { routes };
