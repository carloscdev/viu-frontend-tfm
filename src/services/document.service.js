import axios from "axios";

export class DocumentService {
  async getTotalDocuments() {
    return await axios.get(`/documents/total`);
  }

  async getRecentDocuments() {
    return await axios.get(`/documents/recent`);
  }

  async getDocuments() {
    return await axios.get(`/documents`);
  }

  async getDocumentById(documentId) {
    return await axios.get(`/documents/${documentId}`);
  }

  async createDocument(document) {
    return await axios.post(`/documents`, document);
  }

  async updateDocument(documentId, document) {
    return await axios.patch(`/documents/${documentId}`, document);
  }

  async deleteDocument(documentId) {
    return await axios.delete(`/documents/${documentId}`);
  }

  async getDocumentBySlug(slug) {
    return await axios.get(`/documents/public/${slug}`);
  }
}