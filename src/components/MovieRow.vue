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
  </div>
</template>

<script>
export default {
  props: [
    "movie"
  ]
}
</script>

