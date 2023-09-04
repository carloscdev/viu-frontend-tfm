import axios from "axios";

export class FavoriteService {
  getTotalFavorites() {
    return axios.get(`/favorites/total`);
  }
  getFavorites() {
    return axios.get(`/favorites`);
  }

  validateFavorite(documentId) {
    return axios.get(`/favorites/validate/${documentId}`);
  }

  addFavorite(documentId) {
    return axios.post(`/favorites`, { documentId });
  }

  removeFavorite(documentId) {
    return axios.delete(`/favorites/${documentId}`);
  }
}