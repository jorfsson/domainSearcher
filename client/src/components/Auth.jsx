import decode from 'jwt-decode';

export default class Auth {
  constructor() {
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this._checkStatus = this._checkStatus.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  checkToken(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  }

  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(res => response.json());
  }

  login(username, password) {
    this.fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    .then((res) => this._checkStatus(res))
    .then((res) => {
      this.setToken(res.token);
      return res;
    })
    .catch((err) => { console.log(err) })
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && this.checkToken(token);
  }

  getToken() {
    return localstorage.getItem('token');
  }

  setToken(token) {
    localstorage.setItem('token', token);
  }

  logout() {
    localstorage.removeItem('token');
  }

  _checkStatus(response) {
    return response.status >= 200 && response.status < 300 ?
      response : new Error(`Error ${response.status}`);
  }
}
