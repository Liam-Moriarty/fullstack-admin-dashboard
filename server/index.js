// DEPENDENCIES IMPORTS

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// ROUTES IMPORTS

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// DATA IMPORTS

import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js"; // get the mock data in the data folder and getUser function inside that index.js

// CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES

app.use("/client", clientRoutes); // represent all client related links
app.use("/general", generalRoutes); // represent all general related links ex. dashboard and profile
app.use("/management", managementRoutes); // represent all management related links
app.use("/sales", salesRoutes); // represent all sales related lniks

// SETUP MONGOOSE/DATABASE

const PORT = process.env.PORT || 9000; // if env doesnt exist go to port 9000 instead

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD THE MOCK DATA IN THE DATABASE
    // ONLY ADD DATA ONE TIME
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(`${error} did not connect`));
