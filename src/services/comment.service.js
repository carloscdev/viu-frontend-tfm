import axios from "axios";

export class CommentService {
  async getTotalComments() {
    return await axios.get(`/comments/total`);
  }
}