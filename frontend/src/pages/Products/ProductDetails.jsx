import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message"; // Đảm bảo tên file đúng
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Rating from "./Rating";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  const addToCartHandler = async () => {
    dispatch(addToCart({...product, qty}));
    navigate('/cart');
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Product Image */}
              <div className="relative">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  <div className="absolute top-8 right-8">
                    <HeartIcon product={product} />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-2xl">
                  <div className="bg-gray-800 rounded-2xl p-6">
                    <span className="text-4xl font-bold text-white">
                      ${product.price}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-gray-800 rounded-xl p-4">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center text-gray-300">
                      <FaStore className="mr-3 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Brand</p>
                        <p className="font-semibold">{product.brand}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center text-gray-300">
                      <FaClock className="mr-3 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-400">Added</p>
                        <p className="font-semibold">{moment(product.createdAt).fromNow()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center text-gray-300">
                      <FaStar className="mr-3 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-400">Rating</p>
                        <p className="font-semibold">{product.rating} / 5</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center text-gray-300">
                      <FaShoppingCart className="mr-3 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">In Stock</p>
                        <p className="font-semibold">{product.countInStock} units</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity Selector and Add to Cart */}
                <div className="space-y-4">
                  {product.countInStock > 0 && (
                    <div className="flex items-center space-x-4">
                      <label className="text-gray-300 font-medium">Quantity:</label>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      product.countInStock === 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105 shadow-lg'
                    }`}
                  >
                    {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>

            {/* Product Tabs Section */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductDetails;