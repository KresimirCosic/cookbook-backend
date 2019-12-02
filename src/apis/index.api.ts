import express from "express";
import { register } from "./register.api";
import { login } from "./login.api";
import { logout } from "./logout.api";

export const api = express.Router();

api.use("/register", register);
api.use("/login", login);
api.use("/logout", logout);
