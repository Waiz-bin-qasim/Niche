import { Router } from "express";
import {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getOneFavorite,
  updateFavorite,
} from "../Controller/Favorites.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { buyerCheck } from "../Middlewares/tokenValidation.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const favoriteRoutes = new Router();

// Add favoriteRoutes
favoriteRoutes.get("/", authToken, buyerCheck, getFavorite);
favoriteRoutes.get("/:favorite_id", authToken, buyerCheck, getOneFavorite);
favoriteRoutes.post("/", authToken, buyerCheck, addFavorite);
// favoriteRoutes.put("/:favorite_id", authToken, buyerCheck, updateFavorite);
favoriteRoutes.delete("/:favorite_id", authToken, buyerCheck, deleteFavorite);

export default favoriteRoutes;
