import axios from "axios";

export class FileService {
  getFilesByDocument(documentId) {
    return axios.get(`/files/document/${documentId}`);
  }

  createFile(file) {
    return axios.post("/files/document", file);
  }

  updateFile(fileId, file) {
    console.log(file)
    return axios.put(`/files/${fileId}`, file);
  }

  deleteFile(fileId) {
    return axios.delete(`/files/${fileId}`);
  }
}