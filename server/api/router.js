import { Router } from 'express';
import attributeRouter from 'src/domains/attribute/router';
import productRouter from 'src/domains/product/router';

const baseRouter = Router();

baseRouter.use(attributeRouter);
baseRouter.use(productRouter);

export default baseRouter;
