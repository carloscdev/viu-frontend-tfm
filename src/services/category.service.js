import axios from "axios";

export class CategoryService {
  getCategories() {
    return axios.get(`/categories`);
  }

  getPublicCategories() {
    return axios.get(`/categories/public`);
  }

  createCategory(category) {
    return axios.post(`/categories`, category);
  }

  updateCategory(categoryId, category) {
    return axios.patch(`/categories/${categoryId}`, category);
  }

  getCategoryById(categoryId) {
    return axios.get(`/categories/${categoryId}`);
  }
}