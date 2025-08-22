import { Router } from "express";
import UserService from "../services/UserService";
const router = Router();
const svc = new UserService();

//endpoints

export default router;