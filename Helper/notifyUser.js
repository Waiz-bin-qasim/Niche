import { DirectServicePurchase } from "../Models/DirectServicePurchase.model.js";
import { SendEmailAsync } from "../Services/sendEmail.js";

export const notifyStatusDirectPurchase = async (purchase_id, choice) => {
  let users, sellerResponse, buyerResponse;
  const subject = `Update on Service Purchase #${purchase_id}`;
  try {
    users = await DirectServicePurchase.findUserByPurchaseIdAsync(purchase_id);
    if (choice) {
      sellerResponse = "You Accepted To give service to: ";
      buyerResponse =
        "Your Request to Purchased the service of following seller was accepted: ";
    } else {
      sellerResponse = "You Declined To give service to: ";
      buyerResponse =
        "Your Request to Purchased the service of following seller was declined: ";
    }
    for (let user of users) {
      if (user.role === "seller") {
        await SendEmailAsync(user.email, subject, sellerResponse);
      } else {
        await SendEmailAsync(user.email, subject, buyerResponse);
      }
    }
  } catch (error) {
    throw error;
  }
  return true;
};
