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

module.exports = { nameValidation };