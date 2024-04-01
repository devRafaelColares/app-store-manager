const checkIfProductExists = require('../utils/checkIfProductExists');

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateProductExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productExists = await checkIfProductExists(id);

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    next();
  } catch (error) {
    console.error('Error while checking product existence:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  validateProduct,
  validateProductExists,
};
