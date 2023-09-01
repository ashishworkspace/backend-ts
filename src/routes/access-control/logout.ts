import { NextFunction, Request, Response, Router } from "express";
import Logging from "lib/Logging";

const router = Router();

router.post("/", async (req: Request, res: Response, _next: NextFunction) => {
  req.session.destroy(function (err) {
    if (err) {
      Logging.error(err);
    }
  });
  return res.status(200).send({
    message: "logout successfully.",
  });
});

export { router as logout };
