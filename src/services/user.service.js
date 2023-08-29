import axios from "axios";

export class UserService {
  async getProfile() {
    return await axios.get(`/users/profile`);
  }
}