import axios from "axios";

export class CategoryService {
  async getCategories() {
    return await axios.get(`/categories`);
  }
}