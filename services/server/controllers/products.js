const Product = require('../models').Product;
const Purchase = require("../models").Purchase;
const ProductLog = require("../models").ProductLog;
const User = require("../models").User;
const Sequelize = require("sequelize");
var env = process.env.NODE_ENV || 'development';
var config = require("../config/config.json")[env];

module.exports = {
  create(req, res) {
    // This is not the best way to perform authorization but unfortunately couldn't find any
    // library or any way to work it out. I was runnig out of time
    if (res.locals.user.role === "ADMIN")
    {
      return Product
        .create({
          name: req.body.name,
          stock: req.body.stock,
          price: req.body.price
        })
        .then(product => res.status(201).send(product))
        .catch(error => res.status(400).send(error));
    } else {
      res.status(403).send("Not authorized");
    }
  },

  list(req, res) {
    // Couldn't find a way to use sequelize to create the query so I use the query function and I created
    // a query by my own
    let query;
    var numRecords = (req.query.numRecords) ? Number(req.query.numRecords) : 10,
    numPage = (req.query.pageNumber) ? req.query.pageNumber: 1;
    query = "SELECT p.*, COUNT(l.product_id) as likesCount FROM Products p LEFT JOIN Likes l ON "+
    "p.id = l.product_id";
    if (req.query.searchKeyword){
      query += " WHERE p.name LIKE '"+req.query.searchKeyword+"%'";
    }
    query +=  " GROUP BY p.id ";
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
    sequelize
    .query("SELECT COUNT(a.id) c FROM ("+query+") a", { type: sequelize.QueryTypes.SELECT})
    .then((result) => {
      if (req.query.order == "likes"){
        query += "ORDER BY likesCount DESC "
      } else {
        query += "ORDER BY p.name DESC "
      }
      query += "LIMIT "+(numRecords*(numPage - 1))+", "+numRecords;
      
      sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
      .then((products) =>  res.status(200).send({products: products, 
        pageNumber: numPage, recordsPerPage: numRecords, totalRecords: result[0].c}))
        .catch(error => res.status(400).send(error));
     })
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
    if (res.locals.user.role === "ADMIN")
    {
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
    } else {
      res.status(403).send("Not Authorized");
    }
  }
  
};