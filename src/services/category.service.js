import axios from "axios";

export class CategoryService {
  getCategories() {
    return axios.get(`/categories`);
  }

  getPublicCategories() {
    return axios.get(`/categories/public`);
  }
}