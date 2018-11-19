import decode from 'jwt-decode';

/* ----------------------------------------------------------
  Requests
----------------------------------------------------------*/

function _authFetch(url, options) {
  let startTime = new Date().getTime();
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (isLoggedIn()) {
    headers['Authorization'] = 'Bearer ' + getToken();
  }
  return fetch(url, { headers, ...options })
  .then((res) => {
    let requestDuration = new Date().getTime() - startTime;
    _logRequest(requestDuration.toString());
    return res.json()
  })
}

export function submit(method, username, password) {
  return _authFetch(`http://localhost:3000/${method}`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ username, password })
  })
  .then((data) => _checkStatus(data))
  .then((data) => _setAuth(data))
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
  let token = sessionStorage.getItem('token')
  return token;
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

function _checkStatus(response) {
  return response.status >= 200 && response.status < 300 ?
    response : Promise.reject(new Error(response.error));
}

function _setAuth(response) {
  let token = response.token, decoded = decode(token);
  _setUsername(decoded.username);
  _setToken(token);
  return response;
}

/* ----------------------------------------------------------
  Username
----------------------------------------------------------*/

function _setUsername(username) {
  sessionStorage.setItem('username', username)
}

export function getUsername() {
  return sessionStorage.getItem('username');
}


/* ----------------------------------------------------------
  Login status
----------------------------------------------------------*/

export function isLoggedIn() {
  let token = getToken();
  return !!token && _checkToken(token);
}

export function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
}
