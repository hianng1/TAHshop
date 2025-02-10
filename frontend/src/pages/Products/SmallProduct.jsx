import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
// import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto rounded"
          />
          <HeartIcon product={product} />
        </div>

        <div className="p-4">
          <h2 className="flex justify-between items-center">
            <Link to={`/product/${product._id}`}>
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
            </Link>
          </h2>
        </div>
    </div>
  );
};

export default SmallProduct;
