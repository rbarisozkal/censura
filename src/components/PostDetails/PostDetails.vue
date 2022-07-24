<template>
  <form @submit.prevent="submitNewPost">
    <div v-if="context === 'Song/Artists'" class="music-container">
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

        <button class="songs" @click="songs()" type="button">List Songs</button>
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

    <div v-else-if="context === 'Movies'" class="movie-container">
      <div class="mini-container">
        <label for="choice">Enter movie name:</label>
      </div>
      <AtomSpinner
        v-if="!loaded"
        :animation-duration="1000"
        :size="60"
        :color="'#474646'"
      />
      <vSelect
        @search="(movieInput, loading) => movies(movieInput, loading)"
        v-model="movieInput"
        :options="moviesArr"
        :get-option-label="(option) => option.title"
        :filterable="true"
      >
      </vSelect>
    </div>

    <div v-else-if="context === 'Books'" class="book-container">
      <div class="mini-book-container">
        <label for="choice">Enter book name:</label>
        <vSelect
          @search="(bookInput, loading) => books(bookInput,loading)"
          v-model="bookInput"
          :options="booksArr"
          :get-option-label="(option) =>option.title"
          :filterable="true"
          :closeOnSelect="false"
          label="volumeInfo"
          :clearSearchOnSelect="false"
          :getOptionLabel="option.volumeInfo"
        ></vSelect>
      </div>

      <AtomSpinner
        v-if="!loaded"
        :animation-duration="1000"
        :size="30"
        :color="'#474646'"
      />
    </div>

    <div class="input-area">
      <textarea v-model="postBody" class="post-context" name="input"></textarea>
    </div>
    <button id="postButton" type="button" @click="newPost">CENSURA!</button>
  </form>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { AtomSpinner } from "epic-spinners";
import vSelect from "vue-select";
export default {
  props: {
    context: String,
  },
  components: {
    vSelect,
    AtomSpinner,
  },
  data() {
    return {
      songInput: "",
      movieInput: "",
      bookInput: "",
      songArr: [],
      moviesArr: [],
      booksArr: [],
      loaded: true,
      critiques: [],
      option: "",
    };
  },
  methods: {
    async songs() {
      this.loaded = false;
      this.songArr = await this.$store.dispatch("getSongs", this.songInput);
      console.log(this.songArr);
      this.loaded = true;
    },
    async movies(movieInput, loading) {    
        this.loaded = false;
        loading(true);
        this.moviesArr = await this.$store.dispatch("getMovies", movieInput);
        loading(false);
        this.loaded = true;
      
    },
    async books(bookInput,loading) {
      this.loaded = false;
      loading(true);
      this.booksArr = await this.$store.dispatch("getBooks", bookInput);
      loading(false);
      this.loaded = true;
    },
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
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
</style>
<style scoped lang="scss">
/* SCSS HEX */
$primary-color: #1f99cd;
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
