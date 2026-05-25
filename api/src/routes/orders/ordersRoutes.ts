import { Router } from "express";
import { validateData } from "../../middleware/validationMiddleware.js";
import {
  insertOrdersWithItemsSchema,
  insertOrderSchema,
  updateOrderSchema,
} from "../../db/ordersSchema.js";
import { createOne } from "drizzle-orm";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../../controller/ordersController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { update } from "lodash";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrdersWithItemsSchema),
  createOrder,
);

//get all orders
router.get("/", verifyToken, listOrders);

//get specific order by Id
router.get("/:id", verifyToken, getOrder);

router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
