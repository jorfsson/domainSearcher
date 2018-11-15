import decode from 'jwt-decode';

export function getToken() {
  return sessionStorage.getItem('token') || null
}

export function setToken(token) {
  sessionStorage.setItem('token', token);
}

export function checkToken(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp > Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export function setUsername(username) {
  sessionStorage.setItem('username', username)
}

export function getUsername() {
  return sessionStorage.getItem('username');
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
  .then(res => res.json());
}

export function login(username, password) {
  return authFetch(`http://localhost:3000/login`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ username, password })
  })
  .then((res) => _checkStatus(res))
  .then((res) => {
    setUsername(username);
    setToken(res.token);
    return res.token;
  })
  .catch((err) => { console.log(err) })
}

export function loggedIn() {
  const token = getToken();
  return !!token && checkToken(token);
}

export function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
}

export function register(username, password) {
  return authFetch('http://localhost:3000/register', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ username, password })
  })
  .then((res) => {
    setUsername(username);
    setToken(res.token);
    return res.token;
  })
  .catch((err) => { console.log(err) })
}

export function search(search) {
  let searches = search.split(', ');
  return Promise.all(searches.map((search) => authFetch('http://localhost:3000/search', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ search })
  })
))
}

export function _checkStatus(response) {
  return response.status >= 200 && response.status < 300 ?
    response : Promise.reject(new Error(`Error ${response.status}: ${response}`));
}
