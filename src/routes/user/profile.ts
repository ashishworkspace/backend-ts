import { Timelines } from "@models/Timeline";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(await Timelines.find({}).then((res) => res));
});

export { router as profile };
