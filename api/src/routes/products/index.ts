import { Router, Request, Response } from "express";

const router = Router();

//endpoint for getting products
router.get("/", (req: Request, res: Response) => {
  res.send("the list of products");
});

//get a specific product
router.get("/:id", (req: Request, res: Response) => {
  console.log(req.params);
  res.send("A product");
});

//for creating products
router.post("/", (req: Request, res: Response) => {
  res.send("product created");
});

export default router;
