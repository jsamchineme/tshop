import { Category as CategoryModel } from 'src/domains/models';
import baseRepository from 'src/domains/baseRepository';

const productRepository = {
  init() {
    this.domain = 'category';
  },

  async getAllCategories({ requestURL, paginationMeta }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      paginationMeta,
      fetchFromModel: () => CategoryModel.getAllCategoriesAndCount({ paginationMeta })
    });
    return responseData;
  },

  async getProductCategories({ requestURL, productId, throwProductNotFound }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => CategoryModel.getProductCategories({ productId, throwProductNotFound })
    });
    return responseData;
  },

  async getDepartmentCategories({
    requestURL,
    departmentId,
    throwDepartmentNotFound,
  }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => CategoryModel.getDepartmentCategories({
        departmentId,
        throwDepartmentNotFound
      }),
    });
    return responseData;
  },

  async getSingleCategory({ requestURL, categoryId }) {
    const responseData = await baseRepository.getItemData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => CategoryModel.findByPk(categoryId)
    });
    return responseData;
  },
};

productRepository.init();

export default productRepository;
