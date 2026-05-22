import { Router } from "express";
import { validateData } from "../../middleware/validationMiddleware.js";
import {
  insertOrdersWithItemsSchema,
  insertOrderSchema,
} from "../../db/ordersSchema.js";
import { createOne } from "drizzle-orm";
import { createOrder } from "../../controller/ordersController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrdersWithItemsSchema),
  createOrder,
);

export default router;
