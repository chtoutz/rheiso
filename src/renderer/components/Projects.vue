<template>
  <router-view :active-project="activeProject"></router-view>
</template>

<script>

export default {
  name: 'projects',
  props: ['activeProject']
}
</script>

<style lang="sass" scoped>
</style>
