import { User } from "@models/User";
import { toHash } from "@services/passwordMethods";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.put(
  "/:username",
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { username } = req.params;
      const { newEmail, newPhone, newPassword } = req.body;
      if (newEmail === undefined || newPhone === undefined || newPassword === undefined) {
        return res.status(400).json({ message: "All fields must be provided" });
      }

      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        {
          email: newEmail,
          phone: newPhone,
          password: await toHash(newPassword),
        },
        {
          new: true,
        }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export { router as update };
