<template>
  <tr :class="{'has-text-success': element.status === 'new', 'has-text-warning has-text-weight-bold': element.status === 'modified'}">
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_building">{{ element._building }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_floor">{{ element._floor }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_number">{{ element._number }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_name">{{ element._name }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_length">{{ element._length }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_width">{{ element._width }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_surface">{{ _surface }}</td>
    <td contenteditable="true" @blur="$emit('update-element', $event)" data-param="_height">{{ element._height }}</td>
    <!-- <td contenteditable="true"
      @keyup="changed"
      @blur="changed"
      @paste="changed"
      @delete="changed"
      @focus="changed">{{ element._height }}</td> -->
  </tr>
</template>

<script>
import _ from 'lodash'

// https://blog.midkemia.fr/vue-js-and-editable-contents/

export default {
  name: 'network-element',
  props: [
    'element'
    // 'status',
    // '_building',
    // '_floor',
    // '_number',
    // '_name',
    // '_length',
    // '_width',
    // '_surface',
    // '_height'
  ],
  computed: {
    elementStatusIcon () {
      return {
        'fa-spin fa-spinner': !this.element.status,
        'fa-plus': this.element.status === 'new',
        'fa-edit': this.element.status === 'modified',
        'fa-check': this.element.status === 'unchanged'
      }
    },
    _surface () {
      return (this.element._length && this.element._width) ? _.round((this.element._length * this.element._width), 2) : this.element._surface
    },
    _volume () {
      return _.round(this._surface * this.element._height, 2)
    }
  },
  methods: {
    changed (event) {
      clearTimeout(this.timeoutID)
      // _self = this
      this.timeoutID = setTimeout(function () {
        console.log(event.target)
      // _self.data = $(event.target).html().trim()
      }, 1000)
    }
  }
}
</script>

<style lang="css">
</style>
