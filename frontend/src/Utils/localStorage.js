//Add a product to a local storage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage()
    if(!favorites.some((p) => p._id === product._id)){
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}
//remove a product from a local storage
export const removeFavoritesFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter((product) => product._id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
}
//retrive favorites from a localstorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}