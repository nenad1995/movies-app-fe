<template>
  <div>
    <div>
      <movie-search @search-movie="searchMovie"/>
    </div>
    <ul v-for="movie in filteredMovies" :key="movie.id">
      <movie-row :movie="movie" @select="selectMovies" />
    </ul>
    <div v-if="filteredMovies.length === 0">
      No movies found
    </div>
    <div>
      Number of selected movies: {{selectedMovies.length}}
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
      selectedMovies: [],
    }
  },

  methods: {
    searchMovie(search) {
      this.searchTerm = search
    },

    selectMovies(id) {
      if (this.selectedMovies.includes(id)) {
        let indexOf = this.selectedMovies.indexOf(id)
        this.selectedMovies.splice(indexOf, 1)

        return
      }
      this.selectedMovies.push(id)
    },
  },

  computed: {
    filteredMovies() {
      return this.movies.filter( movie => 
        movie.title.toLowerCase()
          .includes(this.searchTerm.toLowerCase()))
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