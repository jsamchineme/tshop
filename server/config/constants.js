export const PAGINATION_SIZE = 20;

export const ERROR_CODES = {
  PAG_01: {
    status: 400,
    code: 'PAG_01'
  },
  PAG_02: {
    message: 'The field of order is not allowed sorting',
    status: 400,
    code: 'PAG_02'
  },
  PAG_03: {
    message: 'The page number requested is not valid',
    status: 400,
    code: 'PAG_03'
  },
  PRO_01: {
    message: 'Don\'t exist category with this ID',
    status: 404,
    code: 'PRO_01'
  }
};

export const FIELDS_ALLOWED_ORDER = {
  product: ['product_id', 'name', 'price'],
};

export const ORDER_VALUES_ALLOWED = ['ASC', 'DESC'];
