<template>
  <div class="container">
    <main class="login">
		<section class="forms">

			<form class="register" @submit.prevent="register">
				<h2>Register</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="register_form.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="register_form.password" />
				<input 
					type="submit" 
					value="Register" />
			</form>

			<form class="login" @submit.prevent="login">
				<h2>Login</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="login_form.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="login_form.password" />
				<input 
					type="submit" 
					value="Login" />
			</form>

		</section>
	</main>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {

 setup () {
		const login_form = ref({});
		const register_form = ref({});
		const store = useStore();
		const login = () => {
			store.dispatch('login', login_form.value);
		}
		const register = () => {
			store.dispatch('register', register_form.value);
		}
		return {
			login_form,
			register_form,
			login,
			register
		}
	}
}
</script>

<style>
.forms {
	display: flex;
  flex-direction: column;
	min-height: 100vh;
}
form {
	display: flex;
  flex-direction: column;
}
form.register {
	
}
h2 {

}
input {

}
input:not([type="submit"]) {
	
}
input:focus:not([type="submit"]) {
	
}
input::placeholder {
	
}
form.register input:not([type="submit"]) {
	
}
form.login input:not([type="submit"]) {
	
}
form.login input[type="submit"] {

}
form.register input[type="submit"] {
	
}
</style>