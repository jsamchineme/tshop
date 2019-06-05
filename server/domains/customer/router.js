import { Router } from 'express';
import validateRegisterCustomer from 'src/http/middlewares/requestInput/registerCustomer';
import validateLoginCustomer from 'src/http/middlewares/requestInput/loginCustomer';
import validateCustomerUpdate from 'src/http/middlewares/requestInput/updateCustomer';
import validateCustomerAddressUpdate from 'src/http/middlewares/requestInput/updateCustomerAddress';
import validateCreditCardUpdate from 'src/http/middlewares/requestInput/updateCreditCard';
import validateUniqueEmail from 'src/http/middlewares/requestInput/uniqueEmail';
import verifyToken from 'src/http/middlewares/auth/verifyToken';
import wrapAsync from 'src/http/wrapAsync';
import {
  registerCustomer,
  loginCustomer,
  getCustomerById,
  updateCustomer
} from './controller';

const customerRouter = Router();

customerRouter.post('/customers',
  validateRegisterCustomer,
  wrapAsync(registerCustomer));

customerRouter.post('/customers/login',
  validateLoginCustomer,
  wrapAsync(loginCustomer));

customerRouter.get('/customer',
  verifyToken,
  wrapAsync(getCustomerById));

customerRouter.put('/customer',
  verifyToken,
  validateCustomerUpdate,
  validateUniqueEmail,
  wrapAsync(updateCustomer));

customerRouter.put('/customers/address',
  verifyToken,
  validateCustomerAddressUpdate,
  wrapAsync(updateCustomer));

customerRouter.put('/customers/creditCard',
  verifyToken,
  validateCreditCardUpdate,
  wrapAsync(updateCustomer));


export default customerRouter;
