import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { SALT_ROUNDS } from 'src/config/constants';

dotenv.config();

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

export default hashPassword;
