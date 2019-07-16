import axios from 'axios'

export class MoviesService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:3000/api/'
  }

  getAll() {
    return axios.get('movies');
  }

  addMovie(movie) {
    return axios.post('movies', movie);
  }

  get(id) {
    return axios.get(`movies/${id}`);
  }

  edit(id, editedMovie) {
    return axios.put(`movies/${id}`, editedMovie);
  }

  delete(id) {
    return axios.delete(`movies/${id}`);
  }
}


export const moviesService = new MoviesService(); 