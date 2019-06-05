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
      fetchFromModel: () => ProductModel.getAllProductsAndCount({ paginationMeta })
    });
    return responseData;
  },

  async getCategoryProducts({ requestURL, paginationMeta, categoryId }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta,
      fetchFromModel: () => ProductModel.getCategoryProductsAndCount({ paginationMeta, categoryId })
    });
    return responseData;
  },

  async getDepartmentProducts({
    requestURL,
    paginationMeta, departmentId,
    throwDepartmentNotFound,
  }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta,
      fetchFromModel: () => ProductModel.getDepartmentProductsAndCount({
        paginationMeta,
        departmentId,
        throwDepartmentNotFound
      }),
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

  async getProductDetails({ requestURL, productId, throwProductNotFound }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta: undefined,
      fetchFromModel: () => ProductModel.getProductDetails({ productId, throwProductNotFound })
    });
    return responseData;
  },

  async getProductLocations({ requestURL, productId, throwProductNotFound }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta: undefined,
      fetchFromModel: () => ProductModel.getProductLocations({ productId, throwProductNotFound })
    });
    return responseData;
  },

  async getProductReviews({
    requestURL,
    productId,
    paginationMeta,
    throwProductNotFound
  }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta,
      fetchFromModel: () => ProductModel.getProductReviewsAndCount({
        productId,
        throwProductNotFound,
        paginationMeta
      })
    });
    return responseData;
  },

  async createProductReview({
    data,
    throwProductNotFound,
    productId,
  }) {
    return ProductModel.createProductReview({ data, throwProductNotFound, productId });
  }
};

productRepository.init();

export default productRepository;
