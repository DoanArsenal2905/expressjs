const Product = require('../models/product.model')

module.exports.index = async (req, res) => {
  let products = await Product.find()
  res.render('products/index', {
    products: products
  })
}

