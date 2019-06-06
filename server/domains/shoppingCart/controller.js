import md5 from 'md5';
import response from 'src/http/response';
import httpException from 'src/http/httpException';
import {
  ERROR_CODES,
} from 'src/config/constants';
import { ShoppingCart as ShoppingCartModel } from 'src/domains/models';
import shoppingCartTransformer from './transformer';
import shoppingCartRepository from './repository';

export const generateUniqueId = async (req, res) => {
  const uniqueId = md5(new Date()).substring(0, 12);
  const data = {
    cart_id: uniqueId
  };
  return response.success(res, data);
};

export const addProducToCart = async (req, res) => {
  const { cart_id: cartId } = req.body;
  const rows = await shoppingCartRepository.addProducToCart({ data: req.body, cartId });
  const responseData = shoppingCartTransformer.collection({ rows });
  return response.success(res, responseData.rows);
};

export const getCartProducts = async (req, res) => {
  const { cartId } = req.params;
  const rows = await shoppingCartRepository.getCartProducts({ cartId });
  const responseData = shoppingCartTransformer.collection({ rows });
  return response.success(res, responseData.rows);
};

export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const cartItem = await ShoppingCartModel.findByPk(itemId);

  if (!cartItem) {
    throw httpException.handle(ERROR_CODES.CAR_02);
  }
  const { quantity = cartItem.quantity } = req.body;
  await cartItem.update({ quantity });
  const rows = await ShoppingCartModel.findCartItems({ cartId: cartItem.cart_id });

  return response.success(res, shoppingCartTransformer.collection({ rows }));
};

export const clearCartItems = async (req, res) => {
  const { cartId } = req.params;
  await ShoppingCartModel.emptyCart(cartId);
  return response.success(res);
};

export const getTotalAmountForCart = async (req, res) => {
  const { cartId } = req.params;
  const rows = await ShoppingCartModel.findCartItems({ cartId });
  let total_amount = 0;

  rows.forEach((item) => {
    total_amount += Number(item.product.price);
    return total_amount;
  });
  return response.success(res, { total_amount });
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

export const getItemsSavedForLater = async (req, res) => {
  const { cartId } = req.params;
  const rows = await shoppingCartRepository.getCartProducts({ cartId, scope: 'savedForLater' });
  const responseData = shoppingCartTransformer.collection({ rows });
  return response.success(res, responseData.rows);
};

export const removeItemFromCart = async (req, res) => {
  const { itemId } = req.params;
  const cartItem = await ShoppingCartModel.findByPk(itemId);
  if (!cartItem) {
    throw httpException.handle(ERROR_CODES.CAR_02);
  }
  await cartItem.destroy();
  return response.success(res);
};
