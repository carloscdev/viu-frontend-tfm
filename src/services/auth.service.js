import axios from "axios";

export class AuthService {
  async login(user) {
    return await axios.post(`/users/login`, user);
  }

  async register(email, password) {
    return await axios.post(`/users/register`, { email, password });
  }
}