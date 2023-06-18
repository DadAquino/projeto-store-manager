const nameValidation = (req, res, next) => {
    const { name } = req.body;
    const message = { message: '"name" is required' };
    const messageLenght = { message: '"name" length must be at least 5 characters long' };

    if (!name) {
        return res.status(400).json(message);
    }

    if (name.length <= 4) {
        return res.status(422).json(messageLenght);
    }

    next();
};

const newSaleValidation = (req, res, next) => {   
    const productIdMessage = { message: '"productId" is required' };
    const quantityMessage = { message: '"quantity" is required' };
    const quantityMenorQueZero = { message: '"quantity" must be greater than or equal to 1' };

    const { body } = req;

    const [{ productId, quantity }] = body;

    if (!productId) {
        return res.status(400).json(productIdMessage); 
    }

    if (quantity === undefined) {
        return res.status(400).json(quantityMessage); 
    }

    if (quantity <= 0) {
        return res.status(422).json(quantityMenorQueZero); 
    }

    next(); 
};

const updateSaleQuantityValidation = async (req, res, next) => {
    const { quantity } = req.body;

    if (quantity === undefined) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    if (quantity <= 0) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
};

module.exports = { nameValidation, newSaleValidation, updateSaleQuantityValidation };