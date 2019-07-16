<template>
  <div>
    <ul v-for="movie in movies" :key="movie.id">
      <movie-row :movie="movie" />
    </ul>
  </div>
</template>

<script>
import { moviesService } from '../services/Movies'
import MovieRow from "./MovieRow";

export default {
  components: {
    MovieRow,
  },
  
  data() {
    return {
      movies: []
    }
  },

  beforeRouteEnter(to, from,  next) {
    next(vm => {
      moviesService.getAll()
        .then(response => {
          vm.movies = response.data
        })
        .catch(e => {
          alert(e)
        })
    })
  }
}
</script>