import { Router, Request, Response } from "express";
import { validateData } from "../../middleware/validationMiddleware.js";
import { verifyToken, checkUserRole } from "../../middleware/authMiddleware.js";

import {
  listProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  createProduct,
} from "../../controller/productsController.js";

import { createInsertSchema, CreateInsertSchema } from "drizzle-zod"; //helper to create schema for the productsTable
import { productsTable } from "../../db/productsSchema.js";
import {
  createProductSchema,
  updateProductSChema,
} from "../../db/productsSchema.js";

const router = Router();

//endpoint for getting products
router.get("/", listProducts);

//get a specific product
router.get("/:id", getProductById);

//for creating products
router.post(
  "/",
  verifyToken,
  checkUserRole,
  validateData(createProductSchema),
  createProduct,
);

//delete product
router.delete("/:id", deleteProduct);

//update product by id
router.put("/:id", validateData(updateProductSChema), updateProduct);
export default router;
