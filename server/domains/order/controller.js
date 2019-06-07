import response from 'src/http/response';
import httpException from 'src/http/httpException';
import {
  ERROR_CODES,
} from 'src/config/constants';
import { Order as OrderModel } from 'src/domains/models';

/**
 * @param {Object} req - request
 * @param {Object} res - server response
 * @returns {Object} - server response with status code and|or body
 */
export const createNewOrder = async (req, res) => {
  const { id: customer_id } = req.decoded;
  const data = req.body;
  data.customer_id = customer_id;
  try {
    const responseData = await OrderModel.createOrder(data);
    return response.success(res, responseData);
  } catch (error) {
    if (error.message === 'Wrong Shipping ID') {
      throw httpException.handle(ERROR_CODES.ORD_02);
    } else if (error.message === 'Wrong Tax ID') {
      throw httpException.handle(ERROR_CODES.ORD_03);
    } else if (error.message === 'No Item for Cart') {
      throw httpException.handle(ERROR_CODES.ORD_04);
    }
    throw error;
  }
};

/**
 * @param {Object} req - request
 * @param {Object} res - server response
 * @returns {Object} - server response with status code and|or body
 */
export const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await OrderModel.findByPk(orderId);
  return response.success(res, order);
};

/**
 * @param {Object} req - request
 * @param {Object} res - server response
 * @returns {Object} - server response with status code and|or body
 */
export const getSingleOrderShortDetail = async (req, res) => {
  const { orderId } = req.params;
  const order = await OrderModel.findByPk(orderId, {
    attributes: ['order_id', 'total_amount', 'created_on', 'shipped_on', 'status']
  });
  return response.success(res, order);
};

/**
 * @param {Object} req - request
 * @param {Object} res - server response
 * @returns {Object} - server response with status code and|or body
 */
export const getCustomerOrders = async (req, res) => {
  const { id: customer_id } = req.decoded;
  const orders = await OrderModel.getCustomerOrders({ customer_id });
  return response.success(res, orders);
};
