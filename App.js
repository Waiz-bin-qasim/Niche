import express from "express";
import cors from "cors";
import SignUp from "./Routes/SignUp.Route.js";
import LoginRoute from "./Routes/Login.Route.js";
import emailVerification from "./Routes/emailVerification.js";
import UserRoute from "./Routes/User.Route.js";
import BannerRoutes from "./Routes/Banner.Route.js";
import CategoryRoutes from "./Routes/Category.Route.js";
import imageRoutes from "./Routes/Images.Route.js";
import SubCategoryRoutes from "./Routes/SubCategory.Route.js";
import serviceRoute from "./Routes/Services.Route.js";
import sellerRoutes from "./Routes/Seller.Route.js";
import buyerRoutes from "./Routes/Buyer.Route.js";
import DirectPurchaseRoutes from "./Routes/DirectPurchase.Route.js";
import ProposalRoutes from "./Routes/Proposal.Route.js";
import favoriteRoutes from "./Routes/Favorites.Route.js";
const app = express();
const port = 3000;
const ip = "";

app.use(cors());
app.use(express.json());

//module 2
app.use("/signup", SignUp);
app.use("/login", LoginRoute);
app.use("/verify", emailVerification);
app.use("/user", UserRoute);

//module 3
app.use("/banner", BannerRoutes);
app.use("/category", CategoryRoutes);
app.use("/Images", imageRoutes);
app.use("/subcategory", SubCategoryRoutes);
app.use("/service", serviceRoute);
app.use("/seller", sellerRoutes);
app.use("/buyer", buyerRoutes);
app.use("/directpurchase", DirectPurchaseRoutes);

//module 4
app.use("/proposal", ProposalRoutes);
app.use("/favorites", favoriteRoutes);
// buy credit

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
