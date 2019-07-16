<template>
  <div>
    <div>
      <movie-search @search-movie="searchMovie"/>
    </div>
    <ul v-for="movie in filteredMovies" :key="movie.id">
      <movie-row 
        :movie="movie" 
        :selected="isSelected(movie.id)" 
        @select-movie="selectMovie"
        @deselect-movie="deselectMovie" />
    </ul>
    <div v-if="filteredMovies.length === 0">
      No movies found
    </div>
    <div>
      Number of selected movies: {{selectedMovies.length}}
    </div>
     <div>
      <button v-if="movies.length !== selectedMovies.length" @click="selectAll">
        Select All
      </button>
      <button v-if="movies.length === selectedMovies.length" @click="deselectAll">
        Deselect All
      </button>
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
      this.searchTerm = search;
    },

    selectMovie(id) {
      this.selectedMovies.push(id);
    },

    deselectMovie(id) {
      this.selectedMovies = this.selectedMovies.filter(el => el !== id);
    },

    selectAll() {
      this.selectedMovies = [];
      this.filteredMovies.forEach(movie => {
        this.selectedMovies.push(movie.id);
      })
    },

    deselectAll() {
      this.selectedMovies = [];
    },

    isSelected(id) {
      return  this.selectedMovies.includes(id);
    }
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