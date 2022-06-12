import axios from 'axios';
export const getSongs = ({commit})=>{
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {q: 'eminem', type: 'multi', offset: '0', limit: '10', numberOfTopResults: '5'},
        headers: {
          'X-RapidAPI-Key': 'd6b0203059msh5165e1a7177052ap178d45jsn5660ca694bd2',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          commit("SET_SONGS",response.data);
      }).catch(function (error) {
          console.error(error);
      });
}