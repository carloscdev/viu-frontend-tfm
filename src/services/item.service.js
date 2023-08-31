import axios from "axios";

export class ItemService {
  async getItemsByDocument(documentId) {
    return await axios.get(`/items/document/${documentId}`);
  }

  async createItem(item) {
    return await axios.post("/items", item);
  }
}