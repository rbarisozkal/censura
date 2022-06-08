<template>
  <div class="hello">
    <h2>Which content do you want to see or post ?</h2>
    <div class="cards">
    <div class="card">
      <div class="preview-image">
       <img src="../assets/music.png" alt="">
      </div>
      <h3 class="card-header">
        Songs-Albums by Every Artist! <i class="fa-brands fa-spotify"></i>
      </h3>
      <p class="card-body">
        You can see critiques, suggestions and discover about songs.
      </p>
    </div>

    <div class="card">
      <div class="preview-image">
       <img src="../assets/movie.png" alt="">
      </div>
      <h3 class="card-header">
        Movies, Casts, Directors and Many More!
      </h3>
      <p class="card-body">
        Find cast of movies, their genres and find out which movie is the best for your taste!
      </p>
    </div>
    <div class="card">
      <div class="preview-image">
        <img src="../assets/bookshelf.png" alt="">
      </div>
      <h3 class="card-header">
        Books, Magazines, Articles and Interviews
      </h3>
      <p class="card-body">
        You can write your censura's the book you have read, explore new books and people who's taste is good...
      </p>
    </div>
    
</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cards{
  display: flex;
  flex-direction: row;
}
.hello{
  display: flex;
  flex-direction: column;
}
h2 {
  text-align: left;
  margin: 40px 0 40px 0;
}
.card{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: auto;
  padding: 20px;
  border: 0.5px solid gray;
  margin-right: 2rem;
   
   & p{
     text-align: left;
   }
}

</style>
