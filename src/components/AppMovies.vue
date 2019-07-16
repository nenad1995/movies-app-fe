<template>
  <div>
    <div>
      <movie-search @search-movie="searchMovie"/>
    </div>
    <paginate name="movies" :list="filteredMovies" :per="5">
      <ul v-for="movie in paginated('movies')" :key="movie.id">
        <movie-row 
          :movie="movie" 
          :selected="isSelected(movie.id)" 
          @select-movie="selectMovie"
          @deselect-movie="deselectMovie" />
      </ul>
    </paginate>
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
    <div>
      <button @click="nameAsc">Sort by name ASC</button>
      <button @click="nameDesc">Sort by name DESC</button>
      <button @click="durationAsc">Sort by duration ASC</button>
      <button @click="durationDesc">Sort by duration DESC</button>
    </div>
    <paginate-links for="movies"></paginate-links>
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
      paginate: ["movies"]
    }
  },

  methods: {
    searchMovie(search) {
      this.searchTerm = search
    },

    selectMovie(id) {
      this.selectedMovies.push(id)
    },

    deselectMovie(id) {
      this.selectedMovies = this.selectedMovies.filter(el => el !== id)
    },

    selectAll() {
      this.selectedMovies = []
      this.filteredMovies.forEach(movie => {
        this.selectedMovies.push(movie.id)
      })
    },

    deselectAll() {
      this.selectedMovies = []
    },

    isSelected(id) {
      return  this.selectedMovies.includes(id)
    },

    nameAsc() {
      this.movies = this.movies.sort(this.compareTitle)
    },

    nameDesc() {
      let tempMovies = this.movies.sort(this.compareTitle)
      this.movies = tempMovies.reverse()
    },

    durationAsc() {
      this.movies = this.movies.sort(this.compareDuration)
    },

    durationDesc() {
      let tempMovies = this.movies.sort(this.compareDuration)
      this.movies = tempMovies.reverse()
    },

    compareTitle(a, b) {
      let titleA = a.title.toUpperCase()
      let titleB = b.title.toUpperCase()
      if (titleA < titleB) {

        return -1
      }
      if (titleA > titleB) {

        return 1
      }

      return 0
    },

    compareDuration(a, b) {
      let tempA = parseInt(a.duration, 10)
      let tempB = parseInt(b.duration, 10)

      return tempA - tempB
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