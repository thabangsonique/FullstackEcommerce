import { Router, Request, Response } from "express";
import {
  listProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  createProduct,
} from "../../controller/productsController";

const router = Router();

//endpoint for getting products
router.get("/", listProducts);

//get a specific product
router.get("/:id", getProductById);

//for creating products
router.post("/", createProduct);

//delete product
router.delete("/:id", deleteProduct);

//update product by id
router.put("/:id", updateProduct);
export default router;
