import { Request, Response } from "express";
import { db } from "../db/index.js";
import { orderItemsTable, ordersTable } from "../db/ordersSchema.js";
import { error } from "node:console";

//function to create an order
export async function createOrder(req: Request, res: Response) {
  try {
    const { order, items } = req.cleanBody;

    const userId = req.userId; //coming from the verifyToken middleware

    console.log(userId);
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Authentication Failure, no user ID" });
    }

    //restore userId
    const validUserId = userId;

    //insert user id in the orders table to assign the user to the order created.
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId: validUserId })
      .returning();

    //STORE ITEMS INSIDE THE ODER ITEMS TABLE
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    //insert the data inside OrderItems into the order-items-table.
    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (e) {
    res.status(401).json({ message: e });
  }
}
