<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'movies' }" class="navbar-brand">
        Movies
      </router-link>
    </nav>
    <router-view/>
  </div>
</template>