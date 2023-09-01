import { User, newUserSession } from "@models/User";
import { generateOTP } from "@utils/generateOtp";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import { Session } from "express-session";
import Logging from "lib/Logging";

const router = Router();

interface userAttr extends newUserSession {
  otp: number;
}

interface LoginUserSession extends Session {
  userSessionData: userAttr;
}
interface NewUserSession extends Session {
  userSessionData: newUserSession;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username: req_user, password } = req.body;
  const user = await User.findOne({ username: req_user });
  if (!user) {
    return res.status(400).send({
      message: "User do not exist!",
    });
  }

  const isPassMatched = await bcrypt.compare(password, user!.password);
  const otp: number = generateOTP();
  const { username, email, phone, authType } = user;

  if (isPassMatched) {
    const userSession = req.session as LoginUserSession;
    userSession.userSessionData = {
      authType,
      username,
      email,
      phone,
      otp,
    };
    console.log(otp)
    return res.status(200).send({
      message: "Verify OTP!",
    });
  } else {
    return res.status(400).send({
      message: "Password is incorrect",
    });
  }
  res.status(200).send({
    status: "ok",
  });
});

router.post(
  "/smsVerify",
  async (req: Request, res: Response, _next: NextFunction) => {
    const userSession = req.session as LoginUserSession;
    const { smsVerification } = req.body;
    try {
      if (!userSession.userSessionData) {
        return res.sendStatus(403);
      }
      if (userSession.userSessionData.otp !== smsVerification) {
        return res.sendStatus(401);
      }
      const { authType, email, username, phone } = userSession.userSessionData;
      const newUserSession = req.session as NewUserSession;
      newUserSession.userSessionData = {
        authType,
        email,
        username,
        phone,
      };
    } catch (err) {
      Logging.error(err);
    }
    res.status(200).json({
      status: "ok",
    });
  }
);

export { router as login };
