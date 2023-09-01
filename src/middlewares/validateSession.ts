import { NewUserSessionData } from "@routes/access-control/register";
import { NextFunction, Request, Response, Router } from "express";

const validateSession = (req: Request, res: Response, next: NextFunction) => {
  const userSession = req.session as NewUserSessionData;
  if (!userSession.userSessionData) {
    return res.status(400).send({
      message: "bad request error!",
    });
  }
  res.status(200).send({
    userInfo: userSession.userSessionData,
  });
  next();
};

export { validateSession };
