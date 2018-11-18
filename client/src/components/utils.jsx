import decode from 'jwt-decode';

/* ----------------------------------------------------------
  Requests
----------------------------------------------------------*/

function _authFetch(url, options) {
  let startTime = new Date().getTime()
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (loggedIn()) {
    headers['Authorization'] = 'Bearer ' + getToken();
  }
  return fetch(url, { headers, ...options })
  .then((res) => {
    let requestDuration = new Date().getTime() - startTime;
    _logRequest(requestDuration.toString());
    return res.json()
  })
  .catch((err) => console.log(err))
}

export function register(username, password) {
  return _authFetch('http://localhost:3000/register', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ username, password })
  })
  .then((data) => _setAuth(data))
  .then((data) => _checkStatus(data))
  .catch((err) => { console.log(err) })
}

export function login(username, password) {
  return _authFetch(`http://localhost:3000/login`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ username, password })
  })
  .then((data) => _checkStatus(data))
  .then((data) => _setAuth(data))
  .catch((err) => { console.log(err) })
}


export function search(search) {
  let searches = search.split(', ').slice(0, 25);
  return Promise.all(searches.map((search) =>
    _authFetch('http://localhost:3000/search', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ search })
    })
  ))
}

export function convert(current, previous) {
  return _authFetch(`http://localhost:3000/search/convert`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ current, previous })
  }).then((res) => { console.log(res) })
}

function _logRequest(duration) {
  console.log(duration)
  fetch(`http://localhost:3000/requests`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ duration: duration }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .then((data) => { console.log(data) })
}

/* ----------------------------------------------------------
  Token
----------------------------------------------------------*/

export function getToken() {
  return sessionStorage.getItem('token') || null
}

function _setToken(token) {
  sessionStorage.setItem('token', token);
}

function _checkToken(token) {
  try {
    let decoded = decode(token);
    return decoded.exp > Date.now() / 1000 ? true : false;
  } catch (err) {
    console.log(err);
  }
}

/* ----------------------------------------------------------
  Authenticate
----------------------------------------------------------*/

function _setAuth(response) {
  let token = response.token, decoded = decode(token);
  _setUsername(decoded.username);
  _setToken(token);
  return response;
}

function _checkStatus(response) {
  return response.status >= 200 && response.status < 300 ?
    response : Promise.reject(new Error(`Error ${response.status}: ${response}`));
}

function _setUsername(username) {
  sessionStorage.setItem('username', username)
}

export function getUsername() {
  return sessionStorage.getItem('username');
}

export function loggedIn() {
  let token = getToken();
  return !!token && _checkToken(token);
}

export function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
}
