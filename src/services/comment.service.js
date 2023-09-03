import axios from "axios";

export class CommentService {
  getTotalComments() {
    return axios.get(`/comments/total`);
  }

  getCommentsByDocument(documentId) {
    return axios.get(`/comments/document/${documentId}`);
  }

  createComment(comment) {
    return axios.post(`/comments`, comment);
  }

  deleteComment(commentId) {
    return axios.delete(`/comments/${commentId}`);
  }
}