import { Router } from 'express';
import wrapAsync from 'src/http/wrapAsync';
import validateNewOrder from 'src/http/middlewares/requestInput/newOrder';
import verifyToken from 'src/http/middlewares/auth/verifyToken';
import {
  createNewOrder,
  getSingleOrder,
  getCustomerOrders,
  getSingleOrderShortDetail
} from './controller';

const orderRouter = Router();

orderRouter.post('/orders',
  verifyToken,
  validateNewOrder,
  wrapAsync(createNewOrder));

orderRouter.get('/orders/:orderId',
  verifyToken,
  wrapAsync(getSingleOrder));

orderRouter.get('/orders/in/Customer',
  verifyToken,
  wrapAsync(getCustomerOrders));

orderRouter.get('/orders/shortDetail/:orderId',
  verifyToken,
  wrapAsync(getSingleOrderShortDetail));

export default orderRouter;
