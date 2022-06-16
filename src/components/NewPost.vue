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
        <label for="choice">By song name or by artist?</label>
        <div class="mini-container">
          <label for="artist">Artist?</label>
          <input type="checkbox" value="artistChoice" />
          <label for="song">Song?</label>
          <input type="checkbox" value="songChoice" />
        </div>
        <label for="artist">Enter artist: </label>
        <input v-model="artistInput" type="text" />
        <label for="song">Enter song name: </label>
        <input v-model="songInput" type="text" />
        <button class="listSongsButton" @click="songs" type="button">
          List Songs
        </button>
      </div>
      <div v-else-if="chosenContext === 'Movies'" class="movie-container">
        <div class="mini-container">
          <label for="choice">Enter movie name:</label>
          <input v-model="movieInput" type="text" />
        </div>
      </div>

      <div v-else-if="chosenContext === 'Books'" class="book-container">
        <div class="mini-book-container">
          <label for="choice">Enter book name:</label>
          <input v-model="bookInput" required type="text" />
          <label required for="choice">Enter author name:</label>
          <input v-model="authorInput" type="text" />
        </div>
      </div>

      <div class="input-area">
        <textarea class="post-context" type="" name="input"></textarea>
      </div>
      <ul v-if="chosenContext === 'Song/Artists'">
        <li
          v-for="song in songArr"
          :key="song.data.id"
          :track="song.data.name"
          :artist="song.data.artists"
        >
          {{ song.data.name }} by {{song.data.artists.items[0].profile.name}}
        </li>
      </ul>
      <button @click="songs" type="button" id="postButton">CENSURA!</button>
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
      artistInput: "",
      songInput: "",
      songArr:[]
    };
  },
  methods: {
    songs() {
      this.$store.dispatch("getSongs", this.songInput);
      this.songArr=this.$store.state.songs;
      console.log(this.songArr)
    },
  },
  mounted() {
    this.songs;
  },

  watch: {
    selected: {
      handler: function () {
        this.songs;
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
  padding-left: 0;
  max-width: 50%;
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
