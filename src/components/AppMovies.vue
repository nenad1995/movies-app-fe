<template>
  <div>
    <div>
      <movie-search @search-movie="searchMovie"/>
    </div>
    <ul v-for="movie in filteredMovies" :key="movie.id">
      <movie-row :movie="movie" />
    </ul>
    <div v-if="filteredMovies.length === 0">
      No movies found
    </div>
  </div>
</template>

<script>
import { moviesService } from '../services/Movies'
import MovieRow from "./MovieRow"
import MovieSearch from './MovieSearch'


export default {
  components: {
    MovieRow,
    MovieSearch
  },

  data() {
    return {
      movies: [],
      searchTerm: "",
    }
  },

  methods: {
    searchMovie(search) {
      this.searchTerm = search
    }
  },

  computed: {
    filteredMovies() {
      return this.movies.filter( movie => movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
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