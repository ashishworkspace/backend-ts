import { NextFunction, Request, Response, Router } from "express";
import { Session } from "express-session";
import { User, newUserSession } from "@models/User";
import { toHash } from "@services/passwordMethods";
import { generateOTP } from "@utils/generateOtp";
import Logging from "@lib/Logging";

const router = Router();

interface userType {
  authType: string;
  username: string;
  password: string;
  email: string;
  phone: number;
  otp: number;
}

interface UserInProgressSessionData extends Session {
  userSessionData: userType;
}

export interface NewUserSessionData extends Session {
  userSessionData: newUserSession;
}

router.post("/", async (req: Request, res: Response, _next: NextFunction) => {
  const { username, password, email, phone } = req.body;
  const hashedPassword = await toHash(password);
  const otp = generateOTP();

  const user: userType = {
    authType: "email",
    username,
    password: hashedPassword,
    email,
    phone,
    otp,
  };
  const userSession = req.session as UserInProgressSessionData;
  userSession.userSessionData = user;
  console.warn("OTP: ", user.otp);
  res.status(200).send({
    status: "ok",
  });
});

router.post(
  "/smsVerify",
  async (req: Request, res: Response, _next: NextFunction) => {
    const userSession = req.session as UserInProgressSessionData;
    const { smsVerification } = req.body;
    try {
      if (!userSession.userSessionData) {
        return res.sendStatus(403);
      }
      if (userSession.userSessionData.otp !== smsVerification) {
        return res.sendStatus(401);
      }
      const { authType, email, password, username, phone } =
        userSession.userSessionData;

      const userFound = await User.findOne({
        username: userSession.userSessionData.username,
      });

      if (userFound) {
        return res.status(400).json({
          error: "User Already exists!",
        });
      } else {
        const user = new User({
          email,
          password,
          authType,
          username,
          phone,
        });
        user.save();

        const session = req.session as NewUserSessionData;
        session.userSessionData = user.newUserSession();
      }
    } catch (err) {
      Logging.error(err);
    }
    res.status(200).json({
      status: "ok",
    });
  }
);

export { router as register };
