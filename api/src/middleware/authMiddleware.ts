import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//verify user token
export function verifyToken(req: Request, res: Response, next: Function) {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  //verify token keys
  if (!token) {
    res.status(401).json("Access denied");
    return;
  }

  try {
    //if token was found. campare secret key.
    const matched = jwt.verify(token, "your-secret");

    if (typeof matched !== "object" || !matched?.userId) {
      res.status(401).json("Access denied");
      return;
    }

    req.userId = matched.userId;
    next();
  } catch (e) {
    res.status(401).json({ error: "JWT verification failed", e });
  }
}

//CHECK USER role
export function checkUserRole(req: Request, res: Response, next: Function) {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  //check if token exists.
  if (!token) {
    res.status(401).json("Access denied");
    return;
  }

  try {
    //check if token matches
    const matched = jwt.verify(token, "your-secret");

    if (typeof matched !== "object" || !matched?.userId) {
      res.status(401).json("Access denied");
      return;
    }

    //check role of user.
    if (matched.role !== "seller") {
      res.status(401).json("Your are not a seller");
      return;
    }

    req.userId = matched.userId;
    next();
  } catch (e) {
    res.status(401).json("Access denied");
  }
}
