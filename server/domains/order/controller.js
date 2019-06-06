import response from 'src/http/response';
import httpException from 'src/http/httpException';
import {
  ERROR_CODES,
} from 'src/config/constants';
import { ShoppingCart as ShoppingCartModel } from 'src/domains/models';
import shoppingCartTransformer from './transformer';
import shoppingCartRepository from './repository';


export const addProducToCart = async (req, res) => {
  const { cart_id: cartId } = req.body;
  const rows = await shoppingCartRepository.addProducToCart({ data: req.body, cartId });
  const responseData = shoppingCartTransformer.collection({ rows });
  return response.success(res, responseData.rows);
};

export const saveItemForLater = async (req, res) => {
  const { itemId } = req.params;
  const cartItem = await ShoppingCartModel.findByPk(itemId);
  if (!cartItem) {
    throw httpException.handle(ERROR_CODES.CAR_02);
  }
  await cartItem.update({ buy_now: false });
  return response.success(res);
};
