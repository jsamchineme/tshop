import { Attribute as AttributeModel } from 'src/domains/models';
import baseRepository from 'src/domains/baseRepository';

const attributeRepository = {
  init() {
    this.domain = 'attribute';
  },

  async getAllAttributes({ requestURL }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => AttributeModel.getAllAttributes()
    });
    return responseData;
  },

  async getValuesForAttribute({ requestURL, throwAttributeNotFound, attributeId }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => AttributeModel.getValuesForAttribute({ throwAttributeNotFound, attributeId })
    });
    return responseData;
  },

  async getProductAttributes({ requestURL, throwProductNotFound, productId }) {
    const responseData = await baseRepository.getCollectionData({
      domain: this.domain,
      requestURL,
      fetchFromModel: () => AttributeModel.getProductAttributes({ throwProductNotFound, productId })
    });
    return responseData;
  },
};

attributeRepository.init();

export default attributeRepository;
