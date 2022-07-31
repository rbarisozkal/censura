<template>
  <div class="container">
    <form @submit="registerUser">
      <h3>Register</h3>
      <label> Enter an email </label>
      <input v-model="email" type="email" name="" />
      <label> Enter a password </label>
      <input v-model="password" type="password" name=""  />
      <label> Confirm password </label>
      <input v-model="confirmPassword" type="password" name="" />
      <label> Enter your username </label>
      <input v-model="username" type="text" name="" />
      <button type="button" name="button">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth';
export default {

  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    };
  },
  methods:{
    async registerUser(){
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("here");
          this.$router.replace({ name: "secret" });
        })
        .catch(error => (this.error = error));
      
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: auto;
  border: 0.5px solid grey;
}
form{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
