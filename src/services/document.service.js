import axios from "axios";

export class DocumentService {
  async getTotalDocuments() {
    return await axios.get(`/documents/total`);
  }

  async getRecentDocuments() {
    return await axios.get(`/documents/recent`);
  }
}