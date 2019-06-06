import { getQueryOptions } from 'src/services/queryOptions';
import httpException from 'src/http/httpException';
import response from 'src/http/response';
import {
  ERROR_CODES,
} from 'src/config/constants';
import shippingRegionRepository from './repository';

export const getShippingRegions = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await shippingRegionRepository.getAllShippingRegions(queryOptions);
  return response.success(res, result.rows);
};

export const getShippingsForARegion = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  queryOptions.shippingRegionId = req.params.shippingRegionId;
  queryOptions.throwRegionNotFound = () => { throw httpException.handle(ERROR_CODES.RGN_01); };

  const result = await shippingRegionRepository.getShippingsForARegion(queryOptions);
  return response.success(res, result.rows);
};
