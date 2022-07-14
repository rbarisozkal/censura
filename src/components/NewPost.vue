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
        <AtomSpinner
          v-if="!loaded"
          :animation-duration="1000"
          :size="60"
          :color="'#474646'"
        />
        <ul v-if="chosenContext === 'Song/Artists' && loaded">
          <li
            v-for="song in songArr.items"
            :key="song.id"
            :track="song.name"
            :artist="song.artists[0].name"
          >
            {{ song.name }} by
            {{ song.artists[0].name }}
          </li>
        </ul>
      </div>

      <div v-else-if="chosenContext === 'Movies'" class="movie-container">
        <div class="mini-container">
          <label for="choice">Enter movie name:</label>
        </div>
        <AtomSpinner
          v-if="!loaded"
          :animation-duration="1000"
          :size="60"
          :color="'#474646'"
        />
        <!-- <ul v-if="chosenContext === 'Movies' && loaded">
          <li
            v-for="movie in moviesArr"
            :key="movie"
            :title="movie.title"
            :id="movie.id"
            :description="movie.description"
          
          >
            {{ movie.title }} -- {{ movie.description }}
          </li>
        </ul> -->
        <!-- IF WE STUCK ON SELECTING LIST ELEMENTS WE CAN USE SELECT-OPTIONS TAG TO GET DATA -->
        <!--<select @change="(e) => (movieInput = e.target.value)">
          <option disabled value="">Please select one</option>
          <option :value="movie.title" v-for="movie in moviesArr" :key="movie">
            {{ movie.title }} -- {{ movie.description }}
          </option>
        </select>-->

        <multiselect
          @loading="loaded"
          :searchable="true"
          v-model="selectedMovies"
          :delay="0"
          :options="async (query) => {
      return movies(query)
    }"
        >
        </multiselect>
      </div>

      <div v-else-if="chosenContext === 'Books'" class="book-container">
        <div class="mini-book-container">
          <label for="choice">Enter book name:</label>
          <input @keyup="books()" v-model="bookInput" required type="text" />
        </div>

        <AtomSpinner
          v-if="!loaded"
          :animation-duration="1000"
          :size="60"
          :color="'#474646'"
        />
        <ul v-else-if="chosenContext === 'Books' && loaded">
          <li
            v-for="book in booksArr"
            :key="book.id"
            :title="book.volumeInfo.title"
            :author="book.volumeInfo.authors[0]"
            :publisher="book.volumeInfo.publisher"
            :ref="book.id"
            @click="
              selectListElement();
              unselectListElement();
            "
          >
            {{ book.volumeInfo.title }} by
            {{ book.volumeInfo.authors[0] }}
          </li>
        </ul>
      </div>

      <div class="input-area">
        <textarea
          v-model="postBody"
          class="post-context"
          type=""
          name="input"
        ></textarea>
      </div>

      <button id="postButton" type="button" @click="newPost">CENSURA!</button>
    </form>
  </div>
</template>

<script>
import { AtomSpinner } from "epic-spinners";

import Multiselect from "@vueform/multiselect";
import "vue-select/dist/vue-select.css";
export default {
  name: "NewPost",
  components: {
    AtomSpinner,
    Multiselect,
  },
  data() {
    return {
      contexts: ["Select category", "Movies", "Books", "Song/Artists"],
      chosenContext: "",
      songInput: "",
      movieInput: "",
      bookInput: "",
      songArr: [],
      moviesArr: [],
      booksArr: [],
      loaded: true,
      selectedMovies: [],
      postBody: "",
    };
  },
  methods: {
    async songs() {
      this.loaded = false;
      this.songArr = await this.$store.dispatch("getSongs", this.songInput);
      console.log(this.songArr);
      this.loaded = true;
    },
    async movies(e) {
      this.loaded = false;

      this.moviesArr = await this.$store.dispatch("getMovies",e);
      
      this.loaded = true;
       
    },
    async books() {
      this.loaded = false;
      this.booksArr = await this.$store.dispatch("getBooks", this.bookInput);

      this.loaded = true;
    },
  },
  computed: {},
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
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">
/* SCSS HEX */
.selected {
  background: red;
}
$blue-jeans: #0aa9ffff;
$medium-purple: #8a80f9ff;
$lavender-blue: #cebff7ff;
$silver-pink: #cdb1b9ff;
$roman-silver: #83858cff;

/* SCSS HSL */
$blue-jeans: hsla(201, 100%, 52%, 1);
$medium-purple: hsla(245, 91%, 74%, 1);
$lavender-blue: hsla(256, 78%, 86%, 1);
$silver-pink: hsla(343, 22%, 75%, 1);
$roman-silver: hsla(227, 4%, 53%, 1);

/* SCSS RGB */
$blue-jeans: rgba(10, 169, 255, 1);
$medium-purple: rgba(138, 128, 249, 1);
$lavender-blue: rgba(206, 191, 247, 1);
$silver-pink: rgba(205, 177, 185, 1);
$roman-silver: rgba(131, 133, 140, 1);

ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: $lavender-blue;
  margin-top: 0;
  padding-left: 0;
  max-width: 50%;

  li {
    text-align: left;
    min-width: 100%;

    padding: 0 0 5px 5px;
    color: #ffffff;
    list-style: none;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
      background-color: lightgray;
    }
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
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  min-width: 60%;
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
  min-width: 85%;
  height: auto;
  border: 0.5px solid grey;
  padding: 20px;
  margin-top: 1rem;
}
</style>
