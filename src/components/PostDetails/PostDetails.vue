<template>
  <div>
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
        @search="
          (movieInput, loading) => {
            loading(true);
            movies(movieInput).then(() => loading(false));
          }
        "
        v-model="movieInput"
        :options="moviesArr"
        :get-option-label="(option) => option.title"
        :filterable="true"
      ></vSelect>
    </div>

    <div v-else-if="context === 'Books'" class="book-container">
      <div class="mini-book-container">
        <label for="choice">Enter book name:</label>
        <vSelect
          @search="
            (bookInput, loading) => {
              loading(true);
              books(bookInput).then(() => loading(false));
            }
          "
          v-model="bookInput"
          :options="booksArr"
          :get-option-label="(option) => option.volumeInfo.title"
          :filterable="true"
        ></vSelect>
      </div>

      <AtomSpinner
        v-if="!loaded"
        :animation-duration="1000"
        :size="60"
        :color="'#474646'"
      />
    </div>
  </div>
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
    async movies(movieInput) {
      this.loaded = false;
      this.moviesArr = await this.$store.dispatch("getMovies", movieInput);
      this.loaded = true;
    },
    async books(bookInput) {
      this.loaded = false;
      this.booksArr = await this.$store.dispatch("getBooks", bookInput);
      console.log(this.booksArr);
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
