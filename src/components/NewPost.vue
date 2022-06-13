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
          <input
            type="checkbox"
            v-model="toggle"
			value="artistChoice"
          />
          <label for="song">Song?</label>
          <input
            type="checkbox"
            v-model="toggle"
			value="songChoice"
          />
        </div>
        <label v-if="choice === 'artistChoice'" for="artist"
          >Enter artist:
        </label>
        <input v-if="choice !== 'artistChoice'" :v-model="artist" type="text" />
        <label for="song">Enter song name: </label>
        <input v-model="songName" type="text" />
      </div>
      <div v-else-if="chosenContext === 'Movies'" class="movie-container">
        <div class="mini-container">
          <label required for="choice">Enter movie name:</label>
          <input type="text" />
        </div>
      </div>
      <div class="input-area">
        <textarea class="post-context" type="" name="input"></textarea>
      </div>

      <button id="post">CENSURA!</button>
    </form>
  </div>
</template>

<script>
//import vSelect from 'vue-select';
export default {
  name: "NewPost",
  components: {},
  data() {
    return {
      contexts: ["Select category", "Movies", "Books", "Song/Artists"],
      chosenContext: "",
    };
  },
  methods: {
    checkContext() {},
  },
  computed: {
    songs() {
      return this.$store.state.songs;
    },
  },
  mounted() {
    this.$store.dispatch("getSongs");
  },
};
</script>

<style scoped lang="scss">
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
  margin: 1rem 0 1rem 0;
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
#post {
  max-width: 100px;
  height: 40px;
  align-self: flex-end;
  background: transparent;
  border: 0.1rem solid grey;
  margin-top: 0.4rem;
  border-radius: 99em;
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
$primary-color: rgb(68, 96, 255);
$text-color: mix(#000, $primary-color, 64%);
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
  max-width: auto;
  height: auto;
  border: 0.5px solid grey;
  padding: 20px;
  margin-top: 1rem;
}
</style>
