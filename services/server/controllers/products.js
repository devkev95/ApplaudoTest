const Product = require('../models').Product;

module.exports = {
  create(req, res) {
    return Product
      .create({
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Product
    .all()
    .then(products => res.status(200).send(products))
    .catch(error => res.status(400).send(error));
  },

  
};