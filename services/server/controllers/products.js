const Product = require('../models').Product;
const Purchase = require("../models").Purchase;
const ProductLog = require("../models").ProductLog;
const User = require("../models").User;

module.exports = {
  create(req, res) {
    return Product
      .create({
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Product
    .all()
    .then(products => res.status(200).send(products))
    .catch(error => res.status(400).send(error));
  },

  like(req, res){
    Product.findById(req.params.productId).then((product) => {
      product.addUserWhoLikedThis(res.locals.user.sub).then(() => {
        res.status(201).send("Liked successfully saved");
      })
      .catch(error => res.status(400).send(error));
    });
    
  },

  purchase(req, res){
    const product = Product.findById(req.params.productId).then((product) => {
      if (product.stock >= req.body.amount){
        Purchase.create({
          amount: req.body.amount,
          user_id: res.locals.user.sub,
          product_id: req.params.productId,
          date: Date()
        })
        .then((purchase) => {
          product.decrement('stock', {by:req.body.amount})
          .then(res.status(201).send("New purchase created(ID:"+ purchase.id +")"));
        })
        .catch(error => res.status(400).send(error));
      } else {
        res.status(400).send("There's no enough product on stock to deliver the purchase");
      }
    });
  },

  update(req, res){
    const product = Product.findById(req.params.productId).then((product) => {
      var oldPrice = product.price;
      product.price = req.body.price;
      product.save().then(() => {
        ProductLog.create({
          previousPrice : oldPrice,
          newPrice: req.body.price,
          changeDate: Date(),
          user_id: res.locals.user.sub,
          product_id: req.params.productId
        }).then(res.status(201).send("Price updated correctly"))
        .catch(error => res.status(400).send(error));
      })
    });
  }
  
};