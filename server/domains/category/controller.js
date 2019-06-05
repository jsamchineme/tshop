import { getQueryOptions } from 'src/services/queryOptions';
import httpException from 'src/http/httpException';
import response from 'src/http/response';
import {
  ERROR_CODES,
} from 'src/config/constants';
import categoryRepository from './repository';
import categoryTransformer from './transformer';

export const getAllCategories = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await categoryRepository.getAllCategories(queryOptions);

  const responseData = categoryTransformer.collection(result, req);
  return response.success(res, responseData);
};

export const getProductCategories = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { productId } = req.params;
  queryOptions.productId = productId;
  const throwProductNotFound = () => { throw httpException.handle(ERROR_CODES.PRO_01); };
  queryOptions.throwProductNotFound = throwProductNotFound;
  const result = await categoryRepository.getProductCategories(queryOptions);

  const responseData = categoryTransformer.collection(result, req);
  return response.success(res, responseData);
};

export const getDepartmentCategories = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { departmentId } = req.params;
  queryOptions.departmentId = departmentId;
  const throwDepartmentNotFound = () => { throw httpException.handle(ERROR_CODES.DEP_01); };

  queryOptions.throwDepartmentNotFound = throwDepartmentNotFound;
  const result = await categoryRepository.getDepartmentCategories(queryOptions);

  const responseData = categoryTransformer.collection(result, req);
  return response.success(res, responseData);
};

export const getSingleCategory = async (req, res) => {
  const { categoryId } = req.params;
  const result = await categoryRepository.getSingleCategory({
    categoryId,
    requestURL: req.url
  });

  if (result === null || result === undefined) {
    throw httpException.handle(ERROR_CODES.PRO_01);
  }

  const responseData = categoryTransformer.item(result, req);
  return response.success(res, responseData);
};
