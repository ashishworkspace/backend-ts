import { Router } from "express";
import { login } from "@access-control/login";
import { register } from "@access-control/register";
import { logout } from "./logout";

const router = Router();

router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout);

export { router as accessControl };
