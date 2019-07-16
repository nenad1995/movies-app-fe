<template>
  <div>
    <table style="width:100%">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Director</th>
        <th>Image url</th>
        <th>Duration</th>
        <th>Release date</th>
        <th>Genre</th>
      </tr>
      <tr v-for="movie in movies" :key="movie.id">
        <td>{{ movie.id }}</td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.director }}</td>
        <td>{{ movie.imageUrl }}</td>
        <td>{{ movie.duration }}</td>
        <td>{{ movie.releaseDate }}</td>
        <td>{{ movie.genre }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { moviesService } from '../services/Movies'

export default {
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