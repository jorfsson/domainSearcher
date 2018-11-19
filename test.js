const expect  = require('chai').expect;
const request = require('request-promise');
let port = process.env.port || 3000;

let options = (method) => ({
  method: 'POST',
  url: `http://localhost:${port}/${method}/`,
  headers : {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
});

let loginOptions = options('login');
loginOptions['body'] = JSON.stringify({
  username: 'testUser',
  password: 'testPassword'
});

describe('Register', function() {
  it('should create a new user and return access token', function(done) {
    let registerOptions = options('register');
    registerOptions['body'] = JSON.stringify({
      username: 'testUser',
      password: 'testPassword'
    });
      request(registerOptions)
      .then((res) => JSON.parse(res))
      .then((data) => {
        expect(data).to.have.property('token');
        expect(data.auth).to.equal(true);
        expect(data.message).to.equal('Successfully registered!');
        done();
      })
  });
});

describe('Login', function() {
  it('should login with a valid user and return access token', function(done) {
    request(loginOptions)
      .then((res) => JSON.parse(res))
      .then((data) => {
        expect(data).to.have.property('token');
        expect(data.auth).to.equal(true);
        expect(data.message).to.equal('Login successful!');
        done();
      })
  });
});

describe('Search', function() {
  let searchOptions = options('search');
  searchOptions['body'] = JSON.stringify({ search: 'Nike' });

  request(loginOptions)
  .then((res) => JSON.parse(res))
  .then((data) => {
    searchOptions.headers['authorization'] = 'Bearer ' + data.token;
  })

  it('should search for the provided term', function(done) {
    request(searchOptions)
    .then((res) => JSON.parse(res))
    .then((data) => {
      expect(data).to.have.property('results');
      expect(data.results).to.have.length.above(1);
      expect(data.search_term).to.equal('Nike');
      done();
    })
  });

  it('should return results with multiple attributes', function(done) {
      request(searchOptions)
      .then((res) => JSON.parse(res))
      .then((data) => {
        let results = data.results;
        expect(results).to.have.length.above(1);
        expect(results[1]).to.have.property('id');
        expect(results[1]).to.have.property('url');
        expect(results[1]).to.have.property('_pivot_search_id');
        expect(results[1]).to.have.property('_pivot_domain_id');
        expect(results[3]).to.have.property('id');
        expect(results[3]).to.have.property('url');
        expect(results[3]).to.have.property('_pivot_search_id');
        expect(results[3]).to.have.property('_pivot_domain_id');
        done();
      })
  });

  it('should return results that are iterable', function(done) {
      request(searchOptions)
      .then((res) => JSON.parse(res))
      .then((data) => {
        let results = data.results;
        for (let i = 0; i < results.length; i++) {
          expect(results[i]).to.have.property('url');
        }
        done();
      })
  });
});

describe('Request Logging', function() {
  it('should log a request duration', function(done) {
    let requestLogOptions = options('requests');
    requestLogOptions['body'] = JSON.stringify({
      duration: '2000'
    });
      request(requestLogOptions)
      .then((res) => JSON.parse(res))
      .then((data) => {
        expect(data).to.have.property('message');
        expect(data.message).to.equal('Request logged');
        done();
      })
  });
});
