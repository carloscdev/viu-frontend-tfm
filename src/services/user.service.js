import axios from "axios";

export class UserService {
  async getProfile() {
    return await axios.get(`/users/profile`);
  }

  async updateProfile(data) {
    return await axios.patch(`/users/profile`, data);
  }

  async updatePassword(data) {
    return await axios.patch(`/users/password`, data);
  }
}