import axios from "axios";

export class AuthService {
  login(user) {
    return axios.post(`/users/login`, user);
  }

  register(user) {
    return axios.post(`/users/register`, user);
  }

  recoveryPassword(email) {
    return axios.post(`/users/recovery-password`, email);
  }
}