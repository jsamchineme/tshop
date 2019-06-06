import { getQueryOptions } from 'src/services/queryOptions';
import httpException from 'src/http/httpException';
import response from 'src/http/response';
import productReviewTransformer from 'src/domains/review/transformer';
import {
  ERROR_CODES,
} from 'src/config/constants';
import productRepository from './repository';
import productTransformer from './transformer';

export const getAllProducts = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await productRepository.getAllProducts(queryOptions);

  const responseData = productTransformer.collection(result, req);
  return response.success(res, responseData);
};

export const getCategoryProducts = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { categoryId } = req.params;
  queryOptions.categoryId = categoryId;
  const result = await productRepository.getCategoryProducts(queryOptions);

  const responseData = productTransformer.collection(result, req);
  return response.success(res, responseData);
};

export const getDepartmentProducts = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { departmentId } = req.params;
  queryOptions.departmentId = departmentId;
  const throwDepartmentNotFound = () => { throw httpException.handle(ERROR_CODES.DEP_01); };

  queryOptions.throwDepartmentNotFound = throwDepartmentNotFound;
  const result = await productRepository.getDepartmentProducts(queryOptions);

  const responseData = productTransformer.collection(result, req);
  return response.success(res, responseData);
};

export const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await productRepository.getSingleProduct({
    productId,
    requestURL: req.url
  });

  if (result === null || result === undefined) {
    throw httpException.handle(ERROR_CODES.PRO_01);
  }

  const responseData = productTransformer.item(result, req);
  return response.success(res, responseData);
};

export const getProductDetails = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { productId } = req.params;
  queryOptions.productId = productId;
  const throwProductNotFound = () => { throw httpException.handle(ERROR_CODES.PRO_01); };

  queryOptions.throwProductNotFound = throwProductNotFound;
  let result = await productRepository.getProductDetails(queryOptions);

  result = productTransformer.attributeValues.collection(result, req);
  return response.success(res, result.rows);
};

export const getProductLocations = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { productId } = req.params;
  queryOptions.productId = productId;
  const throwProductNotFound = () => { throw httpException.handle(ERROR_CODES.PRO_01); };

  queryOptions.throwProductNotFound = throwProductNotFound;
  let result = await productRepository.getProductLocations(queryOptions);

  result = productTransformer.locations.collection(result, req);
  return response.success(res, result.rows);
};

export const getProductReviews = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { productId } = req.params;
  queryOptions.productId = productId;
  const throwProductNotFound = () => { throw httpException.handle(ERROR_CODES.PRO_01); };

  queryOptions.throwProductNotFound = throwProductNotFound;
  const result = await productRepository.getProductReviews(queryOptions);
  return response.success(res, result.rows);
};

export const createProductReview = async (req, res) => {
  const { productId } = req.params;
  const { id: customer_id } = req.decoded;
  const data = req.body;
  data.customer_id = customer_id;

  const throwProductNotFound = () => { throw httpException.handle(ERROR_CODES.PRO_01); };

  const result = await productRepository.createProductReview({
    data,
    throwProductNotFound,
    productId,
  });
  return response.success(res, await productReviewTransformer.item(result));
};
