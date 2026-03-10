import express from "express";
import { register, login, getUsers, getUser, deleteUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);


userRouter.get("/", protect, getUsers);
userRouter.get("/:id", protect, getUser);
userRouter.delete("/:id", protect, deleteUser);

export default userRouter;