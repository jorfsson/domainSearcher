import decode from 'jwt-decode';

// export default class Auth {
//   constructor() {
//     fetch = fetch.bind(this);
//     login = login.bind(this);
//     this._checkStatus = this._checkStatus.bind(this);
//   }



export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function checkToken(token) {
  const decoded = decode(token);
  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}

export function authFetch(url, options) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (loggedIn()) {
    headers['Authorization'] = 'Bearer ' + getToken();
  }

  return fetch(url, {
    headers,
    ...options
  })
    .then(res => response.json());
}

export function login(username, password) {
  authFetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
  .then((res) => _checkStatus(res))
  .then((res) => {
    setToken(res.token);
    return res;
  })
  .catch((err) => { console.log(err) })
}

export function loggedIn() {
  const token = getToken();
  return !!token && checkToken(token);
}

export function logout() {
  localStorage.removeItem('token');
}

export function register() {
  authFetch('http://localhost:3000/register', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
  .then((res) => _checkStatus(res))
  .then((res) => {
    setToken(res.token);
    return res;
  })
  .catch((err) => { console.log(err) })
}




export function _checkStatus(response) {
  return response.status >= 200 && response.status < 300 ?
    response : new Error(`Error ${response.status}`);
}
