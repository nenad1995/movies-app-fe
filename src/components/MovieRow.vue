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
    <button v-if="!selected" @click="selectMovie">
      Select
    </button>
    <button v-else @click="deselectMovie">
      Deselect
    </button>
  </div>
</template>

<script>
export default {
  props: [
    "movie",
    "selected"
  ],

  methods: {
    selectMovie() {
      this.$emit('select-movie', this.movie.id)
    },

    deselectMovie() {
      this.$emit('deselect-movie', this.movie.id)
    }
  },
}
</script>