import { Router } from "express";
import { login } from "@access-control/login";
import { register } from "@access-control/register";

const router = Router();

router.use("/login", login);
router.use("/register", register);

export { router as accessControl };
