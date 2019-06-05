import { getQueryOptions } from 'src/services/queryOptions';
import response from 'src/http/response';
import httpException from 'src/http/httpException';
import {
  ERROR_CODES,
} from 'src/config/constants';
import departmentRepository from './repository';
import departmentTransformer from './transformer';

export const getAllDepartments = async (req, res) => {
  const queryOptions = getQueryOptions(req);
  const result = await departmentRepository.getAllDepartments(queryOptions);

  return response.success(res, result.rows);
};

export const getSingleDepartment = async (req, res) => {
  const { departmentId } = req.params;
  const result = await departmentRepository.getSingleDepartment({
    departmentId,
    requestURL: req.url
  });

  if (result === null || result === undefined) {
    throw httpException.handle(ERROR_CODES.DEP_01);
  }

  const responseData = departmentTransformer.item(result, req);
  return response.success(res, responseData);
};
