import { Router } from "express";
import { ImageGet } from "../Controller/Images.Controller.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const imageRoutes = new Router();

imageRoutes.get("/:folder/:imageName", ImageGet);
// imageRoutes.get('/', SessionController.store);
// imageRoutes.post('/', SessionController.store);
// imageRoutes.put('/', SessionController.store);
// imageRoutes.delete('/', SessionController.store);
export default imageRoutes;
