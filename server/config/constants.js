export const PAGINATION_SIZE = 20;

export const ERROR_CODES = {
  ATR_01: {
    message: 'Don\'t exist attribute with this ID',
    status: 404,
    code: 'ATR_01'
  },
  AUT_01: {
    message: 'Authorization code is empty',
    status: 403,
    code: 'AUT_01'
  },
  AUT_02: {
    message: 'Access Unauthorized',
    status: 403,
    code: 'AUT_02'
  },
  CAT_01: {
    message: 'Don\'t exist category with this ID',
    status: 404,
    code: 'CAT_01'
  },
  CAR_01: {
    message: 'Wrong Input',
    status: 422,
    code: 'CAR_01'
  },
  CAR_02: {
    message: 'Don\'t exist cart item with this ID',
    status: 404,
    code: 'CAR_02'
  },
  DEP_01: {
    message: 'Don\'t exist department with this ID',
    status: 404,
    code: 'DEP_01'
  },
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
    message: 'Don\'t exist product with this ID',
    status: 404,
    code: 'PRO_01'
  },
  REV_01: {
    status: 422,
    code: 'REV_01'
  },
  USR_01: {
    status: 401,
    code: 'USR_01',
    message: 'Email or Password is invalid'
  },
  USR_02: {
    status: 422,
    code: 'USR_02',
    message: 'Some fields are required'
  },
  USR_03: {
    status: 422,
    code: 'USR_03',
    message: 'The email is invalid'
  },
  USR_04: {
    status: 409,
    code: 'USR_04',
    message: 'The email already exists'
  },
  USR_05: {
    status: 401,
    code: 'USR_05',
    message: 'The email doesn\'t exist'
  },
  USR_06: {
    status: 422,
    code: 'USR_06',
    message: 'this is an invalid phone number'
  },
  USR_07: {
    status: 422,
    code: 'USR_07',
    message: 'this is too long <FIELD NAME>'
  },
  USR_08: {
    status: 422,
    code: 'USR_08',
    message: 'this is an invalid Credit Card'
  },
  USR_09: {
    status: 422,
    code: 'USR_09',
    message: 'The Shipping Region ID is not number'
  },
  USR_10: {
    status: 422,
    code: 'USR_10',
    message: 'TThe [field] is shorter than [min-length]'
  },
  USR_11: {
    status: 422,
    code: 'USR_11',
    message: 'TThe [field] is longer than [max-length]'
  }
};

export const FIELDS_ALLOWED_ORDER = {
  product: ['product_id', 'name', 'price'],
};

export const ORDER_VALUES_ALLOWED = ['ASC', 'DESC'];

export const TOKEN_EXPIRTY_TIME = '24h';
