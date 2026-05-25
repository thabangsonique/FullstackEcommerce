import { Request, Response } from "express";
import { db } from "../db/index.js";
import { orderItemsTable, ordersTable } from "../db/ordersSchema.js";
import { error } from "node:console";
import { eq } from "drizzle-orm";

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

//FUNCTION FOR LISTING ALL THE CREATED ORDERS.
export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//GETTING SPECIFIC ORDER BY ITS ID
export async function getOrder(req: Request, res: Response) {
  try {
    //collect id from url

    const id = parseInt(req.params.id);
    //check if order id exists in order table
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    if (orders.length === 0) {
      res.status(404).json("order not found!");
    }

    //merge outcome to display single order and its items
    const mergedOrder = {
      ...orders[0].orders,
      items: orders.map((itemOrder) => itemOrder.order_items),
    };

    res.status(200).json(mergedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
}

//UPDATING THE ORDER.
export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const [update] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!update) {
      res.status(404).json("Order Not Found!");
    }

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json(error);
  }
}
