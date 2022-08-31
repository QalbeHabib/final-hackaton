const model = require("../Model/cartModel");
const productModel = require("../Model/productModel");


exports.add = async (req, res, next) => {
  const data = req.body;

  

  const cart = await model.findOne({user: data.userId})
    .populate(["user", "products.product"]);
      const product = await productModel.findOne({ _id: data.productId });
      const filterProduct =  cart.products.filter(item => item.product._id == data.productId);
     const total = filterProduct ?   filterProduct[0].qty + data.productQty : data.productQdty;

    if ( total >= product.qty) {
      res.status(400).send({ status: "Error", message: "Not enough stock" });
      console.log({ status: "Error", message: "Not enough stock" });
    } else {
      if (1 == 1) {
        const updateCart = await model.findOneAndUpdate(
          { user: data.userId, "products.product": data.productId },
          { $inc: { "products.$.qty": data.productQty } },
          { new: true }
        );
        
        const updateProduct = await productModel.findByIdAndUpdate(
                data.productId,
                 { qty: product.qty - data.productQty },
                 { new: true }
               );
        const updatedCarts = await model.find().populate("products.product");
        res.send(updatedCarts);
  
      }else if (1 == 2) {
        const updateProduct = await productModel.findByIdAndUpdate(cart._id)
        console.log("=.==>>..>>",cart._id)
      }
    }
};
exports.new = async (req, res, next) => {
  console.log("New");
  const data = req.body;

  const newCart = {
    user: data.userId,
    products: [
      {
        product: data.productId,
        qty: data.productQty,
      },
    ],
  };
  try {
    const product = await productModel.findOne({ _id: data.productId });
    const cart = await model.create(newCart);
    // const quantity = product.qty - data.productQty;
    // await productModel.findByIdAndUpdate( data.productId,{ qty: quantity },{ new: true });
    const updatedCarts = await model.findOne({user:data.userId}).populate("products.product");
    res.send(updatedCarts);
  } catch (err) {
    next(err);
  }

}
//\\ UPDATE CART QUANTITY //\\
exports.updateqty = async (req, res, next) => {
  console.log("Update Qty");

  const data = req.body;
  try {
    // const product = await productModel.findOne({ _id: data.productId });
    const updateCart = await model.findOneAndUpdate(
      { user: data.userId, "products.product": data.productId },
      { $inc: { "products.$.qty": + data.productQty } 
    },
      { new: true }
    );
    // const updateProduct = await productModel.findByIdAndUpdate(
    //   data.productId,
    //   { qty: product.qty - data.productQty },
    //   { new: true }
    // );
    const updatedCarts = await model.findOne({user:data.userId}).populate("products.product");
    res.send(updatedCarts);
    } catch (err) {
    next(err);
  }
}

//\\ NEW CART //\\
exports.newproduct = async (req, res, next) => {
  console.log("New Product");
  const data = req.body;
  const newCart = { 
        product: data.productId,
        qty: data.productQty,
      }
  try {
    // const product = await productModel.findOne({ _id: data.productId });
    const updateCart = await model.findOneAndUpdate({ user: data.userId, },{ $push: { products:newCart } },{ new: true });    
    // const quantity = product.qty - data.productQty;
    // await productModel.findByIdAndUpdate( data.productId,{ qty: quantity },{ new: true });
    const updatedCarts = await model.findOne({user:data.userId}).populate("products.product");
    res.send(updatedCarts);
  }
  catch (err) {
    next(err);
  } 
}

exports.get = async (req, res, next) => {
  const id = req.params.id;
  console.log("id",id)
  try {
    const cart = await model.findOne({user:id}).populate("products.product");
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.body.userId;

  // const cart = await model.findOne({user: userId})

    const deleteCart = await model.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { _id: productId } } },
      { new: true }
    );
    const updatedCart = await model.findOne({user:userId}).populate("products.product");
      res.send(updatedCart);

};


exports.update = async (req, res, next) => {
  const id = req.params.id; // 1: Getting user Id
  const data = req.body.data; // 2: Getting user data like if user click on +
  const cart = await model.findById(id); // 3: Getting cart data from mongoDB
  const product = await productModel.findById(cart.productId); // 4: Getting product data from mongoDB
  const cartQty = cart.productQty; // 5: Getting cart qty
  const productQty = product.qty; // 6: Getting product qty

  try {
    const newTotal = data == 0 ? cartQty - 1 : cartQty + 1; // 7: Calculating new total qty
    const productStock = data == 0 ? productQty + 1 : productQty - 1; // 8: Calculating new product stock
    if (productStock < 0) {
      console.log("Not Enough Stock =>", newTotal);
    } else {
      if (newTotal >= 1) {

        const updateCart = await model.findByIdAndUpdate(
          id,
          { productQty: newTotal },
          { new: true }
        );
        const updateProduct = await productModel.findByIdAndUpdate(
          cart.productId,
          { qty: productStock },
          { new: true }
        );
        const updatedCarts = await model.find(); 
        res.send(updatedCarts); 
      } else {
        res.status(400).send({ status: "Error", message: "Not enough stock" });
      }
    }
  } catch (err) {
    next(err);
  }
};
