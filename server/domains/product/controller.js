import { getQueryOptions } from 'src/services/queryOptions';
import response from 'src/http/response';
import httpException from 'src/http/httpException';
import {
  ERROR_CODES,
} from 'src/config/constants';
import productRespository from './repository';
import transformer from './transformer';

export const getAllProducts = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await productRespository.getAllProducts(queryOptions);

  const responseData = transformer.collection(result, req);
  return response.success(res, responseData);
};

export const getCategoryProducts = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { categoryId } = req.params;
  queryOptions.categoryId = categoryId;
  const result = await productRespository.getCategoryProducts(queryOptions);

  const responseData = transformer.collection(result, req);
  return response.success(res, responseData);
};

export const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await productRespository.getSingleProduct({
    productId,
    requestURL: req.url
  });

  if (result === null || result === undefined) {
    throw httpException.handle(ERROR_CODES.PRO_01);
  }

  const responseData = transformer.item(result, req);
  return response.success(res, responseData);
};
