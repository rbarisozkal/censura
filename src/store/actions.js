import axios from 'axios';
export  const getSongs = ({commit},track)=>{
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {q:`${track}`, type: 'tracks', offset: '0', limit: '10', numberOfTopResults: '5'},
        headers: {
          'X-RapidAPI-Key': 'd6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
       axios.request(options).then(function (response) {
          console.log(response.data.tracks.items);
          commit("SET_SONGS",response.data.tracks.items);
      }).catch(function (error) {
          console.error(error);
      });
}
export const getMovies=({commit},movieName)=>{
    const options = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/title/find',
        params: {q:`${movieName}`},
        headers: {
          'X-RapidAPI-Key': 'd6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2',
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          commit("SET_MOVIES",response.data);
      }).catch(function (error) {
          console.error(error);
      });
}
export const getBooks=({commit})=>{
    const options = {
        method: 'GET',
        url: 'https://hapi-books.p.rapidapi.com/book/56597885',
        headers: {
          'X-RapidAPI-Key': 'd6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2',
          'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        commit("SET_BOOKS",response.data);
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
}