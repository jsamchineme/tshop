import { Product as ProductModel } from 'src/domains/models';
import baseRepository from 'src/domains/baseRepository';

const productRepository = {
  init() {
    this.domain = 'product';
  },
  async getAllProducts({ requestURL, paginationMeta }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta,
      fetchFromModel: async () => {
        const result = await ProductModel.getAllProductsAndCount(paginationMeta);
        return result;
      }
    });
    return responseData;
  },
  async getCategoryProducts({ requestURL, paginationMeta, categoryId }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta,
      fetchFromModel: () => ProductModel.getCategoryProductsAndCount(paginationMeta, categoryId)
    });
    return responseData;
  },
  async getSingleProduct({ requestURL, productId }) {
    const responseData = await baseRepository.getItemData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => ProductModel.findByPk(productId)
    });
    return responseData;
  },
};

productRepository.init();

export default productRepository;
