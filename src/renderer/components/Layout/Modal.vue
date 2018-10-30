<template>
  <transition
      name="fade"
      appear
      mode="in-out"
    >
    <div :class="['modal', {'is-active': show}]">
      <div class="modal-background" @click="close()"></div>
      <div class="modal-content">
        <div class="box">
          <slot></slot>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="close()"></button>
    </div>
  </transition>
</template>

<script>
// import ProjectsMixin from '@/mixins/Projects'

export default {
  name: 'modal',
  // mixins: [ProjectsMixin],
  // props: [ 'show' ],
  props: {
    tabs: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // tabClass () {
    //   return {'is-active': activeTab}
    // },
  },
  methods: {
    close () {
      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="css">
</style>
