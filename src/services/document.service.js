import axios from "axios";

export class DocumentService {
  getTotalDocuments() {
    return axios.get(`/documents/total`);
  }

  getRecentDocuments() {
    return axios.get(`/documents/recent`);
  }

  getDocuments() {
    return axios.get(`/documents`);
  }

  getDocumentById(documentId) {
    return axios.get(`/documents/${documentId}`);
  }

  createDocument(document) {
    return axios.post(`/documents`, document);
  }

  updateDocument(documentId, document) {
    return axios.patch(`/documents/${documentId}`, document);
  }

  deleteDocument(documentId) {
    return axios.delete(`/documents/${documentId}`);
  }

  getDocumentBySlug(slug) {
    return axios.get(`/documents/public/${slug}`);
  }

  getPublicDocuments() {
    return axios.get(`/documents/public`);
  }
}