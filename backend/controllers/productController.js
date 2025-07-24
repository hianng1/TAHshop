import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, countInStock } = req.fields;
    // console.log(name)
    // console.log(description)
    // console.log(price)
    // console.log(category)
    // console.log(quantity)
    // console.log(brand)
    switch (true) {
      case !name:
        return res.json({ error: "Name is required!" });
      case !brand:
        return res.json({ error: "brand is required!" });
      case !description:
        return res.json({ error: "description is required!" });
      case !price:
        return res.json({ error: "price is required!" });
      case !category:
        return res.json({ error: "category is required!" });
      case !quantity:
        return res.json({ error: "quantity is required!" });
    }
    
    const productData = { ...req.fields };
    // Ensure countInStock is set, use quantity if countInStock is not provided
    if (!productData.countInStock && productData.quantity) {
      productData.countInStock = productData.quantity;
    }
    
    const product = new Product(productData);
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, countInStock } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required!" });
      case !brand:
        return res.json({ error: "brand is required!" });
      case !description:
        return res.json({ error: "description is required!" });
      case !price:
        return res.json({ error: "price is required!" });
      case !category:
        return res.json({ error: "category is required!" });
      case !quantity:
        return res.json({ error: "quantity is required!" });
    }
    
    const updateData = { ...req.fields };
    // Ensure countInStock is set, use quantity if countInStock is not provided
    if (!updateData.countInStock && updateData.quantity) {
      updateData.countInStock = updateData.quantity;
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Delete success", name: product.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Product not found!" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alrReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alrReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review); // Sửa 'review' thành 'reviews'
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message }); // Sửa cấu trúc trả về lỗi
  }
});

const fetchTopProduct = asyncHandler(async(req, res) => {
  try {
    const products = await Product.find({}).sort({rating: -1}).limit(4);
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
})

const fetchNewProduct = asyncHandler(async(req, res) => {
  try {
    const products = await Product.find().sort({_id:-1}).limit(5)
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
})

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const {checked, radio} = req.body

    let args = {}
    if(checked.length > 0) args.category = checked;
    if(radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Server Error"})
  }
})
export {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProduct,
  fetchNewProduct,
  filterProducts,
};
