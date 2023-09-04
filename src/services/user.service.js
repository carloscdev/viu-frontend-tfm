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

  getUsers() {
    return axios.get(`/users`);
  }

  updateUser(userId, data) {
    return axios.patch(`/users/active/${userId}`, data);
  }

  updateRoleUser(userId, data) {
    return axios.patch(`/users/role/${userId}`, data);
  }
}