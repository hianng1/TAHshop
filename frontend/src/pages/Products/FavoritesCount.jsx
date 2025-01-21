import { useSelector } from "react-redux"

const FavoritesCount = () => {
    const favorites = useSelector(state => state.favorites)
    const favoriteCount = favorites.length;
    return (
    <div className="absolute left-2 top-8">
        {}
    </div>
  )
}

export default FavoritesCount