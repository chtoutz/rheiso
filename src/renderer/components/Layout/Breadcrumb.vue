<template>
  <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
    <ul>
      <li v-for="item in items" :class="{'is-active': item.active}">
        <router-link :to="item.to">{{ item.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    items: {type: Array, required: false}
  }
}
</script>
