import express, { Request, Response } from "express";

const port = 3000; //port will be recieving requests and responses from

const app = express(); //initialize express app

app.get("/", (req: Request, res: Response) => {
  res.send("this is thabang muleba");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
