import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TOKEN_EXPIRTY_TIME } from 'src/config/constants';

dotenv.config();

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.customer_id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRTY_TIME }
  );

  return {
    token: `Bearer ${token}`,
    expiresIn: TOKEN_EXPIRTY_TIME
  };
};
