import axios from "axios";

export class AuthService {
  async login(user) {
    return await axios.post(`/users/login`, user);
  }

  async register(user) {
    return await axios.post(`/users/register`, user);
  }
}