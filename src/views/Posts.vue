<template>
  <div class="posts">
      <NewPost/>
  </div>
</template>

<script>
import NewPost from '../components/NewPost.vue';
export default {
    name: 'PostsView',
    components:{NewPost},
}
</script>

<style>

</style>