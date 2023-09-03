import axios from "axios";

export class UserService {
  getProfile() {
    return axios.get(`/users/profile`);
  }

  updateProfile(data) {
    return axios.patch(`/users/profile`, data);
  }

  updatePassword(data) {
    return axios.patch(`/users/password`, data);
  }
}