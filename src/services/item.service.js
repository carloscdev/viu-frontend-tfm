import axios from "axios";

export class ItemService {
  async getItemsByDocument(documentId) {
    return await axios.get(`/items/document/${documentId}`);
  }

  async createItem(item) {
    return await axios.post("/items", item);
  }

  async getItemById(itemId) {
    return await axios.get(`/items/${itemId}`);
  }

  async updateItem(itemId, item) {
    return await axios.patch(`/items/${itemId}`, item);
  }

  async deleteItem(itemId) {
    return await axios.delete(`/items/${itemId}`);
  }
}