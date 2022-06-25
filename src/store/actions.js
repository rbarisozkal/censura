import axios from "axios";
export const getSongs = ({ commit }, track) => {
  var request = require('request'); // "Request" library

var client_id = 'clientID'; // Your client id
var client_secret = 'clientSecret'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});
  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data.tracks);
      commit("SET_SONGS", response.data.tracks);
      return response.data.tracks;
    })
    .catch(function (error) {
      console.error(error);
    });
};
export const getMovies = ({ commit }, movieName) => {
  if (movieName != " " || movieName != "") {
    return axios
      .get(`https://imdb-api.com/en/API/SearchTitle/--TOKEN--/${movieName}`)
      .then(function (response) {
        commit("SET_MOVIES", response.data.results);
        return response.data.results;
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    console.error("Movie input is empty!");
  }
};
export const getBooks = ({ commit }, bookInput) => {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookInput}&printType=all&key=--TOKEN--&maxResults=5&country=US`
    )
    .then(function (response) {
      commit("SET_BOOKS", response.data.items);
      console.log(response.data.items);
      return response.data.items;
    })
    .catch(function (error) {
      console.error(error);
    });
};
