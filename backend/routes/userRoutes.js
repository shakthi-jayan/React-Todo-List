import express from "express";
import { register, login, getUsers, getUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;