import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    addToFavourite,
    removeFromFavourite,
    setFavourites,
} from "../../redux/features/favourites/favoriteSlice.js";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoritesFromLocalStorage,
} from "../../Utils/localStorage.js";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavourites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavourite(product));
      // remove the product from the localStorage as well
      removeFavoritesFromLocalStorage(product._id);
    } else {
      dispatch(addToFavourite(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div className="absolute top-2 right-5 cursor-pointer">
  {isFavorite ? (
    <FaHeart className="text-pink-500" onClick={toggleFavorites} />
  ) : (
    <FaRegHeart className="text-white" onClick={toggleFavorites} />
  )}
</div>

  );
};

export default HeartIcon;