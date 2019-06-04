import { Router } from 'express';
import { validatePage, validateOrderBy } from 'src/http/middlewares/pagination';
import wrapAsync from 'src/http/wrapAsync';
import { getAllProducts, getSingleProduct, getCategoryProducts } from './controller';

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

export default productRouter;
