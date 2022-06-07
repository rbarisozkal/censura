<template>
  <nav>
    <div class="brand">
      <img src="./assets/icon.png" alt="icon" />
      <router-link id="brand" to="/">censura</router-link>
    </div>
    <div class="router-links">
      
    <router-link to="/">Home</router-link>
    <router-link to="/about">What is Censura ¿</router-link>
    </div>
  </nav>
  <div id="body">

    <div class="bar">
      <router-link to="/"> <i class="fa-solid fa-circle-plus fa-xs"></i>Posts</router-link>
      <router-link to="/"> <i class="fa-solid fa-gear fa-xs"></i> Settings</router-link>
      <router-link to="/"> <i class="fa-solid fa-user fa-xs"></i> My Profile</router-link>
    </div>

   <router-view id="router-view" />
  </div>
 
</template>

<style lang="scss">
#router-view{
  height: 100%;
  width: 100%;
  display:flex;
}
.container{
  width: 85%;
  height: 100%;
  display: inline-block;
  align-items: flex-start;
}
.empty{

  background: red;
  width:200px;
  height: 200px;
}
#body{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.bar{
  padding-top: 20px;
  padding-left: 5px;
  min-width: 15%;
  height: 100%;
  position: fixed;
  background-color: #00a9ff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #ffffff;
  font-size: 20px;
  flex-grow: 1;
}

.bar a{
  text-decoration: none;
  color: #ffffff;
  margin: 15px 0 15px 0;
   padding-left: 15px;
}
#app {
  font-family:'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  
}

nav {
  background-color: #00a9ff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.router-links {
  background-color: #00a9ff;
  display: flex;
  flex-direction: row;
  
  font-family:'Quicksand', sans-serif;
  justify-content: space-between;
}
.router-links a{
   font-weight: bold;
  color: #ffffff;
  margin: 0 5px 0 5px;
  padding: 0 10px 0 10px;
  font-size: 18px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.brand{
  
  display: flex;
  flex-direction: row;
  font-family: "Permanent Marker", cursive;
  align-items: center;
  color: #ffffff;
  padding: 0 10px 0 10px;
}
#brand{
  font-size: 34px;
}
.brand a{
  margin-left: 5px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  padding: 5px;
  font-size: 18px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

nav a.router-link-exact-active {
  color: #aaaaaa;
}
#brand.router-link-exact-active{
  color: #ffffff;
}
</style>
