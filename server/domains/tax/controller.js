import { getQueryOptions } from 'src/services/queryOptions';
import httpException from 'src/http/httpException';
import response from 'src/http/response';
import {
  ERROR_CODES,
} from 'src/config/constants';
import taxRepository from './repository';

export const getAllTaxes = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await taxRepository.getAllTaxes(queryOptions);
  return response.success(res, result.rows);
};

export const getTaxById = async (req, res) => {
  const { taxId } = req.params;
  const queryOptions = getQueryOptions(req);
  queryOptions.taxId = taxId;

  const result = await taxRepository.getTaxById(queryOptions);
  if (!result) {
    throw httpException.handle(ERROR_CODES.TAX_01);
  }
  return response.success(res, result);
};
