import axios from "axios";
export const getSongs = ({ commit }, songName) => {
  const options = {
    method: "GET",
    url: `https://cdn.shazam.com/search/v3/en/GB/web/search?query=${songName}&offset=5&numResults=5&types=songs`,
    params: { track: ``, limit: "5" },
    headers: {
      "X-RapidAPI-Key": "d6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2",
      "X-RapidAPI-Host": "shazam8.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data, songName);
      commit("SET_SONGS", response.data);
      return response.data;
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
        //create new propertie called "code" for each movie
       
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
      return response.data.items;
    })
    .catch(function (error) {
      console.error(error);
    });
};
