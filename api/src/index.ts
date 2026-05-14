import express, { Request, Response } from "express";
import productRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/authRoutes.js";

const port = 3000; //port will be recieving requests and responses from

const app = express(); //initialize express app

app.use(express.json());

app.use("/products", productRoutes);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
