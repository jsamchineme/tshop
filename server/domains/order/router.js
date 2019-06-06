import { Router } from 'express';
import wrapAsync from 'src/http/wrapAsync';
import validateNewOrder from 'src/http/middlewares/requestInput/newOrder';
import verifyToken from 'src/http/middlewares/auth/verifyToken';
import {
  createAnOrder
} from './controller';

const orderRouter = Router();

orderRouter.post('/orders',
  verifyToken,
  validateNewOrder,
  wrapAsync(createAnOrder));

export default orderRouter;
