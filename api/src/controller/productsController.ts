import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  //logic to fetch all the products
  res.send("list all products");
}

//fetching a specific product by its id
export function getProductById(req: Request, res: Response) {
  res.send("getproductById");
}

//create product
export function createProduct(req: Request, res: Response) {
  res.send("Product created");
}

//update existing product
export function updateProduct(req: Request, res: Response) {
  res.send("product update");
}

//Delete product

export function deleteProduct(req: Request, res: Response) {
  res.send("delete a product");
}
