<template>
  <div class="new-post">
    <h3 class="post-header">What do you want to talk about>></h3>
    <div class="labels">
      <select v-model="chosenContext">
        <option v-for="context in contexts" :key="context">
          {{ context }}
        </option>
      </select>
    </div>
    <PostDetails :context="chosenContext"/>
  </div>
</template>

<script>

import PostDetails from '../components/PostDetails/PostDetails.vue'
export default {
  name: "NewPost",
  components: {
    PostDetails
  },
  data() {
    return {
      contexts: ["Select category", "Movies", "Books", "Song/Artists"],
      chosenContext: "",
    };
  },
  methods: {
    submitNewPost(){
      console.log(this.chosenContext)
    }
  },

  
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
