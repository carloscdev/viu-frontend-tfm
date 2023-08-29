import axios from "axios";

export class FavoriteService {
  async getTotalFavorites() {
    return await axios.get(`/favorites/total`);
  }
}