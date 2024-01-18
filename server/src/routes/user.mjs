import { Router } from "express";
import { getUserInfo } from "../controllers/user.mjs";

const router = Router();

router.get('/', getUserInfo)


export default router;