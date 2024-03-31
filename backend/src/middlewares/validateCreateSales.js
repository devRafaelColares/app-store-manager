const checkIfProductExists = require('../utils/checkIfProductExists');

const validateProductId = (req, res, next) => {
  const { body } = req;
    
  if (!Array.isArray(body)) {
    return res.status(400).json({ message: 'Request body should be an array' });
  }
  
  for (let i = 0; i < body.length; i += 1) {
    const item = body[i];
    if (!item.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }
  
  next();
};
    
const validateIfQuantityExist = (req, res, next) => {
  const { body } = req;
  
  for (let i = 0; i < body.length; i += 1) {
    const item = body[i];
    if (item.quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }
  
  next();
};

const validateIfQuantityMoreThanZero = (req, res, next) => {
  const { body } = req;

  for (let i = 0; i < body.length; i += 1) {
    const item = body[i];

    if (item.quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }
  next();
};
  
const validateProductIdExists = (req, res, next) => {
  const { body } = req;
  
  const productExistencePromises = body.map(async (item) => {
    const { productId } = item;
    const productExists = await checkIfProductExists(productId);
    return productExists;
  });
  
  Promise.all(productExistencePromises)
    .then((existenceResults) => {
      if (existenceResults.some((exists) => !exists)) {
        return res.status(404).json({ message: 'Product not found' });
      }
      next();
    })
    .catch((error) => {
      console.error('Error while checking product existence:', error);
      return res.status(500).json({ message: 'Internal server error' });
    });
};
  
module.exports = {
  validateProductId,
  validateIfQuantityExist,
  validateIfQuantityMoreThanZero,
  validateProductIdExists,
};
