import {
  ShoppingCart as ShoppingCartModel,
} from 'src/domains/models';

const productRepository = {
  init() {
    this.domain = 'product';
  },

  async addProducToCart({ data, cartId }) {
    const foundProduct = await ShoppingCartModel.findProductInCart(data);
    if (!foundProduct) {
      await ShoppingCartModel.create(data);
    }
    const rows = await ShoppingCartModel.findCartItems({ cartId });
    return rows;
  },

  async getCartProducts({ cartId, scope }) {
    const rows = await ShoppingCartModel.findCartItems({ cartId, scope });
    return rows;
  },

  // async createProductReview({
  //   data,
  //   throwProductNotFound,
  //   productId,
  // }) {
  //   return ProductModel.createProductReview({ data, throwProductNotFound, productId });
  // }
};

productRepository.init();

export default productRepository;