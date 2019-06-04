import { getPaginationMeta } from 'src/services/pagination';

export const getQueryOptions = (req) => {
  const paginationMeta = getPaginationMeta(req);

  return {
    requestURL: req.url,
    paginationMeta
  };
};
