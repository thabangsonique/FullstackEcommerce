import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import productRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/authRoutes.js";
import ordersRoutes from "./routes/orders/ordersRoutes.js";
import serverless from "serverless-http";

const port = process.env.PORT || 3000; //port will be recieving requests and responses from

const app = express(); //initialize express app

app.use(express.json());

app.use("/products", productRoutes);

app.use("/auth", authRoutes);

app.use("/orders", ordersRoutes);

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
