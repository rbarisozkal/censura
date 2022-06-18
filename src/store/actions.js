import axios from "axios";
export const getSongs = ({ commit }, track) => {
  const options = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/search",
    params: { term: `${track}`, locale: "en-US", offset: "0", limit: "5" },
    headers: {
      "X-RapidAPI-Key": "d6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      commit("SET_SONGS", response.tracks.hits);
      return response.tracks.hits;
    })
    .catch(function (error) {
      console.error(error);
    });
};
export const getMovies = ({ commit }, movieName) => {
  if (movieName != " " || movieName != "") {
    return axios
      .get(`https://imdb-api.com/en/API/SearchTitle/k_l4j6isbb/${movieName}`)
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
      `https://www.googleapis.com/books/v1/volumes?q=${bookInput}&printType=all&key=AIzaSyCWEqSK3LFYVNNx0OWLXq6BC77uX1wWzlQ&maxResults=5&country=US`
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
