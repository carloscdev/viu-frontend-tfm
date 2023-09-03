import axios from "axios";

export class ItemService {
  getItemsByDocument(documentId) {
    return axios.get(`/items/document/${documentId}`);
  }

  createItem(item) {
    return axios.post("/items", item);
  }

  getItemById(itemId) {
    return axios.get(`/items/${itemId}`);
  }

  updateItem(itemId, item) {
    return axios.patch(`/items/${itemId}`, item);
  }

  deleteItem(itemId) {
    return axios.delete(`/items/${itemId}`);
  }
}