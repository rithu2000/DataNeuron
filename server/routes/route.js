import { Router } from "express";
import { addData, getData, updateData } from "../controllers/controller.js";

const router = Router();

router.get('/', getData);
router.post('/add', addData);
router.post('/update', updateData);

export default router;