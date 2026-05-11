import { Router, Request, Response } from "express";
import { validateData } from "../../middleware/validationMiddleware";

import {
  listProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  createProduct,
} from "../../controller/productsController";

import { createInsertSchema, CreateInsertSchema } from "drizzle-zod"; //helper to create schema for the productsTable
import { productsTable } from "../../db/productsSchema";
import {
  createProductSchema,
  updateProductSChema,
} from "../../db/productsSchema";

const router = Router();

//endpoint for getting products
router.get("/", listProducts);

//get a specific product
router.get("/:id", getProductById);

//for creating products
router.post("/", validateData(createProductSchema), createProduct);

//delete product
router.delete("/:id", deleteProduct);

//update product by id
router.put("/:id", validateData(updateProductSChema), updateProduct);
export default router;
