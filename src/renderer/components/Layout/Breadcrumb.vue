<template>
  <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
    <ul>
      <li><a href="#">Bulma</a></li>
      <li><a href="#">Documentation</a></li>
      <li><a href="#">Components</a></li>
      <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'breadcrumb'
}
</script>

<style lang="css" scoped>
.breadcrumb {
  padding: 10px 20px;
}
</style>
