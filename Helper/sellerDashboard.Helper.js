import { Services } from "../Models/Service.model.js";

export const sellerLevel = (totalEarning) => {
  if (totalEarning < 100) {
    return 1;
  } else if (totalEarning < 1000) {
    return 2;
  } else if (totalEarning < 10000) {
    return 3;
  }
  return 0;
};

export const sellerAvgRating = async (seller_id) => {
  let response;
  try {
    const ratingsOfAllService = await Services.getAllRatingsBySellerIdAsync(
      seller_id
    );
    if (ratingsOfAllService.length > 0) {
      let total = 0;
      for (let rating of ratingsOfAllService) {
        total += rating.total_projects_completed / rating.total_rating;
      }
      response = total / ratingsOfAllService.length;
    } else {
      response = 0;
    }
  } catch (error) {
    throw error;
  }
  return response || 0;
};
