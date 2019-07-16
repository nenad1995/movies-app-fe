<template>
  <div>
    <li>
      id: {{movie.id}}
      Title: {{movie.title}}
      Director: {{movie.director}}
      Url: {{movie.imageUrl}}
      Duration: {{movie.duration}}
      Release Date: {{movie.releaseDate}}
      Genre: {{movie.genre}}
    </li>
    <button @click="selected">Select</button>
  </div>
</template>

<script>
export default {
  props: [
    "movie"
  ],

  methods: {
    selected() {
      this.$emit("select", this.movie.id);
    }
  }
}
</script>