import { PAGINATION_SIZE } from 'src/config/constants';

/**
 * @param {String} field - the value supplied in the query eg. ?orderBy=status,verified
 * @returns {Array} the order array as required by Sequelize ORM
 */
export const getOrderByData = (field) => {
  const parsedArray = field.split(',');
  const orderField = parsedArray[0];
  const orderValue = parsedArray[1];

  return {
    orderField,
    orderValue
  };
};

/**
 * @param {*} page - the current page
 * @param {*} pageSize - the number records on a page
 * @param {*} orderBy - the orderBy field
 * @returns {*} - pagination object
 */
export const dbQueryOptions = ({ page, pageSize, orderBy }) => {
  console.log({ page, pageSize, orderBy });
  const currentPage = page - 1;
  const offset = currentPage * pageSize;
  const limit = pageSize;

  const pageDataOptions = {
    offset,
    limit,
  };

  if (orderBy) {
    const { orderField, orderValue } = orderBy ? getOrderByData(orderBy) : {};
    pageDataOptions.order = [
      [orderField, orderValue]
    ];
  }

  return pageDataOptions;
};

export const getPaginationMeta = (req) => {
  const { orderBy = '', limit = PAGINATION_SIZE, page = 1 } = req.query;

  const paginationMeta = {
    page: Number(page),
    pageSize: Number(limit),
    orderBy
  };

  return paginationMeta;
};

export const generatePaginationMeta = async (totalRecords, pagination) => {
  const { pageSize, page: currentPage } = pagination;
  const lastPage = Math.ceil(totalRecords / pageSize);
  const nextPage = currentPage < lastPage ? currentPage + 1 : null;
  const previousPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    last_page: lastPage,
    current_page: currentPage,
    previous_page: previousPage,
    per_page: pageSize,
    next_page: nextPage,
  };
};
