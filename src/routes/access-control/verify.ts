import { Router } from "express";
import { validateSession } from "@middlewares/validateSession";

const router = Router();

router.get("/", validateSession);

export { router as verify };
