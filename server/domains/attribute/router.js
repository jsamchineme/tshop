import { Router } from 'express';
import { Attribute } from 'src/domains/models';


const attributeRouter = Router();

attributeRouter.get('/attributes', async (req, res) => {
  const attributes = await Attribute.findAll();

  return res.status(200).send(attributes);
});

attributeRouter.post('/attributes', async (req, res) => {
  const attributes = await Attribute.findAll();

  return res.status(200).send(attributes);
});

export default attributeRouter;
