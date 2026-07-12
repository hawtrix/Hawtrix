import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paymentRouter from "./payment";
import trainingRouter from "./training";

const router: IRouter = Router();

router.use(healthRouter);
router.use(paymentRouter);
router.use(trainingRouter);

export default router;
