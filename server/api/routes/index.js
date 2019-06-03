import { Router } from 'express';
import { Attribute } from '../../models';

const baseRouter = Router();

baseRouter.get('/attributes', async (req, res) => {
  const attributes = await Attribute.findAll();

  return res.status(200).send(attributes);
});

export default baseRouter;