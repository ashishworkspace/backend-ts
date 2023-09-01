import { Router } from "express";
import { profile } from "@routes/user/profile";
import { update } from "./update";

const router = Router();

router.use("/profile", profile);
router.use("/update", update);

export { router as user };
