import { Request, Response } from "express";
import { db } from "../db/index.js";
import { productsTable } from "../db/productsSchema.js";

import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  //logic to fetch all the products

  try {
    const products = await db.select().from(productsTable);
    res.json(products); //no need for status when getting all products
  } catch (error) {
    res.status(500).json(error);
  }
}

//fetching a specific product by its id
export async function getProductById(req: Request, res: Response) {
  try {
    //extract id from url
    const { id } = req.params;

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    //id not found
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

//create product
export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.userId);
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

//update existing product
export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedProduct] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product Not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

//Delete product

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const [deleteProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    //check if product was delete.
    if (deleteProduct) {
      res.status(204).json({ message: "Product was deleted successfully." });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
