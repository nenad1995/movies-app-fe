<template>
  <div>
    <input class="form-control" type="text" placeholder="Search" aria-label="Search" @input="search">
  </div>
</template>

<script>
export default {
  methods: {
    search(event) {
      this.$emit('search-movie', event.target.value)
    }
  }
}
</script>