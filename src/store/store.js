import axios from "axios";
import { createStore } from "vuex";
import router from "../router";
import { auth } from "../data/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export default createStore({
  state: {
    user: null,
    books:[],
    movies:[],
    songs:[]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_SONGS(state, songs) {
      state.songs = songs;
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_BOOKS(state, books) {
      state.movies = books;
    }
    ,
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async logout({ commit }) {
      await signOut(auth);
      commit("CLEAR_USER");
      router.push("/login");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
    async getSongs({ commit }, songName) {
      const options = {
        method: "GET",
        url: `https://cdn.shazam.com/search/v3/en/GB/web/search?query=${songName}&offset=5&numResults=5&types=songs`,
        params: { track: ``, limit: "5" },
        headers: {
          "X-RapidAPI-Key":
            "d6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2",
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
    },
    async getMovies({ commit }, movieName) {
      if (movieName != " " || movieName != "") {
        return axios
          .get(
            `https://imdb-api.com/en/API/SearchTitle/k_l4j6isbb/${movieName}`
          )
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
    },
    async getBooks({ commit }, bookInput) {
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
    },
  },
});
