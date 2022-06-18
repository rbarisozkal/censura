<template>
  <div class="new-post">
    <form action="">
      <h3 class="post-header">What do you want to talk about>></h3>
      <div class="labels">
        <select @change="(e) => (chosenContext = e.target.value)">
          <option :value="context" v-for="context in contexts" :key="context">
            {{ context }}
          </option>
        </select>
      </div>

      <div v-if="chosenContext === 'Song/Artists'" class="music-container">
        <div class="songInfo">
          <label for="choice">By song name or by artist?</label>
          <div class="mini-container">
            <label for="artist">Artist?</label>
            <input type="checkbox" value="artistChoice" />
            <label for="song">Song?</label>
            <input type="checkbox" value="songChoice" />
          </div>
          <label for="song">Enter song name: </label>
          <input v-model="songInput" type="text" />

          <button class="songs" @click="songs()" type="button">
            List Songs
          </button>
        </div>
        <ul
          v-if="
            chosenContext === 'Song/Artists' &&
            (songArr != undefined || songArr != null)
          "
        >
          <li
            v-for="song in songArr"
            :key="song.track.key"
            :track="song.track.title"
            :artist="song.data.artists"
          >
            {{ song.track.title }} by
            {{ song.data.artists.items[0].profile.name }}
          </li>
        </ul>
      </div>

      <div v-else-if="chosenContext === 'Movies'" class="movie-container">
        <div class="mini-container">
          <label for="choice">Enter movie name:</label>
          <input v-model="movieInput" type="text" />
        </div>
        <ul
          v-if="
            chosenContext === 'Movies' &&
            (moviesArr != undefined || moviesArr != null)
          "
        >
          <li v-for="movie in moviesArr" :key="movie" :title="movie.title" :id="movie.id" :description="movie.description">
            {{ movie.title }} -- {{movie.description}}
          </li>
  
        </ul>
        <button
          @click="
            movies();
          "
          type="button"
        >
          List movies
        </button>
      </div>

      <div v-else-if="chosenContext === 'Books'" class="book-container">
        <div class="mini-book-container">
          <label for="choice">Enter book name:</label>
          <input v-model="bookInput" required type="text" />
        </div>
        <ul
          v-if="
            chosenContext ===  'Books' &&
            (booksArr != undefined || booksArr != null)
          "
        >
          <li
            v-for="book in booksArr"
            :key="book.id"
            :title="book.volumeInfo.title"
            :author="book.volumeInfo.authors[0]"
            :publisher="book.volumeInfo.publisher"
          >
            {{ book.volumeInfo.title}} by
            {{ book.volumeInfo.authors[0]}}
          </li>
        </ul> 
        <button
          @click="
           books();
          "
          type="button"
        >
          List Books or Authors
        </button>
      </div>

      <div class="input-area">
        <textarea class="post-context" type="" name="input"></textarea>
      </div>

      <button id="postButton">CENSURA!</button>
    </form>
  </div>
</template>

<script>
// import ListElements from "./ListElements.vue";
//import vSelect from 'vue-select';

export default {
  name: "NewPost",
  components: {},
  data() {
    return {
      contexts: ["Select category", "Movies", "Books", "Song/Artists"],
      chosenContext: "",
      songInput: "",
      movieInput: "",
      bookInput:"",
      songArr: [],
      moviesArr: [],
      booksArr:[]
    };
  },
  methods: {
    async songs() {
      console.log(this.songArr);
      this.songArr = await this.$store.dispatch("getSongs", this.songInput);
      this.songInput = "";
    },
    async movies() {
      this.moviesArr = await this.$store.dispatch("getMovies", this.movieInput);
      console.log(this.moviesArr);
      this.movieInput = "";
    },
    async books() {
      
      this.booksArr = await this.$store.dispatch("getBooks", this.bookInput);
      console.log(this.booksArr);
      this.bookInput = "";
    },
  },
  computed: {
    
  },
  watch: {
    selected: {
      handler: function () {
        this.songArr;
        this.moviesArr;
        this.booksArr;
      },
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: 0;
  padding-left: 0;
  max-width: 50%;
  li {
    padding: 5px;
    margin: 5px;
    list-style: none;
  }
}
.songInfo {
  display: flex;
  align-items: flex-start;
  max-width: 50%;
  flex-direction: column;
  margin: 0 0 1rem 0;
  & label {
    padding: 0 0 5px 0;
  }
  & span {
    padding: 0 5px 5px 0;
  }
  & input {
    padding: 0 5px 5px 0;
    outline: none;
  }
}
.book-container {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  align-items: flex-start;
  & .mini-book-container {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    padding-bottom: 10px;
  }
}

$primary-color: #1f99cd;
$text-color: mix(#ffffff, $primary-color, 64%);
.listSongsButton {
  align-self: flex-end;
  padding: 10px;
  background-color: $primary-color;
  border: none;
  color: #ffffff;
  cursor: pointer;
}
.mini-container {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  max-width: 50%;
}
.music-container {
  display: flex;
  flex-direction: row;
}
select {
  background-color: #1f99cd;
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  border-radius: 2px;
  border: none;
  color: #ffffff;
  padding: 10px 30px 10px 10px;
  // disable default appearance
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

// remove dotted firefox border

.labels {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}
.input-area {
  display: block;
}
#postButton {
  max-width: 100px;
  height: 40px;
  align-self: flex-end;
  background: transparent;
  border: 0.1rem solid grey;
  margin-top: 0.4rem;
  border-radius: 99em;
  cursor: pointer;
}
.post-context {
  display: block;
  text-align: left;
  width: 650px;
  min-height: 100px;
  font-size: 15px;
  font-family: "Quicksand", sans-serif;
  outline: none;
  resize: none;
  &:focus {
    overflow: hidden;
  }
}
form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

label {
  display: inline-block;
  cursor: pointer;
  input {
    position: absolute;
    left: -9999px;
    &:checked + span {
      background-color: mix(#fff, $primary-color, 84%);
      &:before {
        box-shadow: inset 0 0 0 0.4375em $primary-color;
      }
    }
  }
  span {
    display: flex;
    align-items: center;
    padding: 0.3rem 0.5rem;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;
    &:hover {
      background-color: mix(#fff, $primary-color, 84%);
    }
    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: #fff;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      margin-right: 0.375em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em $primary-color;
    }
  }
}
.new-post {
  display: flex;
  flex-direction: column;
  min-width: 70%;
  height: auto;
  border: 0.5px solid grey;
  padding: 20px;
  margin-top: 1rem;
}
</style>
