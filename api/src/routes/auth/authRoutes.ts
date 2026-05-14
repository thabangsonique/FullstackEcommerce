import { Router } from "express";
import { validateData } from "../../middleware/validationMiddleware.js";
import { createUserSchema, loginSchema } from "../../db/usersSchema.js";
import bcrypt from "bcrypt";
import { usersTable } from "../../db/usersSchema.js";
import { db } from "../../db/index.js";
import { has } from "lodash";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

//router for register
router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;

    //hash data password
    data.password = await bcrypt.hash(data.password, 10);

    //store user inside database
    const [user] = await db.insert(usersTable).values(data).returning();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json("something went wrong");
  }

  //LAST LEFT OFF 03:21:41
});

//router for login
router.post(
  "/login",

  validateData(loginSchema),
  async (req, res) => {
    //collect data emnail and password.
    const { email, password } = req.cleanBody;

    //check if email exists
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json("Authentication Failure");
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json("Authentication failure");
    }

    //assign token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      "your-secret",
      { expiresIn: "30d" },
    );

    res.status(200).json({ message: "Login successful", token });
  },
);

export default router;
