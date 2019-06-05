import { Router } from 'express';
import { validatePage, validateOrderBy } from 'src/http/middlewares/pagination';
import verifyToken from 'src/http/middlewares/auth/verifyToken';
import validateNewReview from 'src/http/middlewares/requestInput/newReview';
import wrapAsync from 'src/http/wrapAsync';
import {
  getAllProducts,
  getSingleProduct,
  getCategoryProducts,
  getDepartmentProducts,
  getProductDetails,
  getProductLocations,
  getProductReviews,
  createProductReview,
} from './controller';

const productRouter = Router();

productRouter.get('/products',
  validatePage,
  validateOrderBy('product'),
  wrapAsync(getAllProducts));

productRouter.get('/products/:productId',
  wrapAsync(getSingleProduct));

productRouter.get('/products/inCategory/:categoryId',
  validateOrderBy('product'),
  wrapAsync(getCategoryProducts));

productRouter.get('/products/inDepartment/:departmentId',
  validateOrderBy('product'),
  wrapAsync(getDepartmentProducts));

productRouter.get('/products/:productId/details',
  wrapAsync(getProductDetails));

productRouter.get('/products/:productId/locations',
  wrapAsync(getProductLocations));

productRouter.get('/products/:productId/reviews',
  wrapAsync(getProductReviews));

productRouter.post('/products/:productId/reviews',
  verifyToken,
  validateNewReview,
  wrapAsync(createProductReview));

export default productRouter;
