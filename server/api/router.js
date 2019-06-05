import { Router } from 'express';
// import attributeRouter from 'src/domains/attribute/router';
import productRouter from 'src/domains/product/router';
import customerRouter from 'src/domains/customer/router';
import departmentRouter from 'src/domains/department/router';
import categoryRouter from 'src/domains/category/router';

const baseRouter = Router();

// baseRouter.use(attributeRouter);
baseRouter.use(productRouter);
baseRouter.use(customerRouter);
baseRouter.use(departmentRouter);
baseRouter.use(categoryRouter);

export default baseRouter;
