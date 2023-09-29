import { Favorites } from "../Models/Favorites.model.js";

export const addFavorite = async (req, res) => {
  const { user_id, service_id } = req.body;
  let response;
  try {
    const favorite = new Favorites({
      buyer_id: user_id,
      service_id: service_id,
    });
    response = await favorite.createAsync();
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const getFavorite = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await Favorites.getFavoriteByBuyerIdAsync(user_id);
    if (response.length === 0) {
      throw "Nothing Found";
    }
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const getOneFavorite = async (req, res) => {
  const { user_id } = req.body;
  const { favorite_id } = req.params;
  let response;
  try {
    response = await Favorites.getFavoriteByBuyerIdAsync(user_id, favorite_id);
    if (response.length === 0) {
      throw "Nothing Found";
    }
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const deleteFavorite = async (req, res) => {
  const { user_id } = req.body;
  const { favorite_id } = req.params;
  let response;
  try {
    response = await Favorites.deleteFavoriteByIdAsync(user_id, favorite_id);
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const updateFavorite = async (req, res) => {};
