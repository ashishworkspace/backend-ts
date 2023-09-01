import { Router } from "express";
import { login } from "@access-control/login";
import { register } from "@access-control/register";
import { logout } from "@access-control/logout";
import { verify } from "@access-control/verify";

const router = Router();

router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout);
router.use("/verify", verify );

export { router as accessControl };
