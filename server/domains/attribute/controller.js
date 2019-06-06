import { getQueryOptions } from 'src/services/queryOptions';
import httpException from 'src/http/httpException';
import productTransformer from 'src/domains/product/transformer';
import response from 'src/http/response';
import {
  ERROR_CODES,
} from 'src/config/constants';
import attributeRepository from './repository';
import attributeTransformer from './transformer';

export const getAllAttributes = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await attributeRepository.getAllAttributes(queryOptions);
  return response.success(res, attributeTransformer.collection(result, req));
};

export const getValuesForAttribute = async (req, res) => {
  const { attributeId } = req.params;
  const queryOptions = getQueryOptions(req);

  const throwAttributeNotFound = () => { throw httpException.handle(ERROR_CODES.ATR_01); };
  queryOptions.throwAttributeNotFound = throwAttributeNotFound;
  queryOptions.attributeId = attributeId;

  const result = await attributeRepository.getValuesForAttribute(queryOptions);
  return response.success(res, attributeTransformer.values.collection(result, req));
};

export const getProductAttributes = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const { productId } = req.params;
  queryOptions.productId = productId;
  const throwProductNotFound = () => { throw httpException.handle(ERROR_CODES.PRO_01); };

  queryOptions.throwProductNotFound = throwProductNotFound;
  let result = await attributeRepository.getProductAttributes(queryOptions);

  result = productTransformer.attributeValues.collection(result, req);
  return response.success(res, result.rows);
};
