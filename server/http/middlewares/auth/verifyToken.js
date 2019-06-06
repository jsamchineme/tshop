import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import httpException from 'src/http/httpException';
import { Customer as CustomerModel } from 'src/domains/models';
import {
  ERROR_CODES,
} from 'src/config/constants';

dotenv.config();

const stripTokenBearerString = (tokenString) => {
  const splitArray = tokenString.split(' ');
  const token = splitArray.length > 1 ? splitArray[splitArray.length - 1] : splitArray[0];
  return token;
};

const verifyToken = (req, res, next) => {
  let token = req.headers['user-key'];

  if (token) {
    token = stripTokenBearerString(token);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw httpException.handle(ERROR_CODES.AUT_02);
      }

      const user = await CustomerModel.findByPk(decoded.id);
      if (!user) {
        next(httpException.handle(ERROR_CODES.AUT_02));
      }
      req.decoded = decoded;
      next();
    });
  } else {
    throw httpException.handle(ERROR_CODES.AUT_01);
  }
};

export default verifyToken;
