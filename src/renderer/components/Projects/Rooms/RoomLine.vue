<template>
  <tr
    :class="roomLineClass"
    @click="handleClick($event, room._id)">
    <td v-if="isImporting" @click="confirmStatus(room)">
      <span class="icon">
        <i class="fa" :class="roomStatusIcon"></i>
      </span>
    </td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_building">{{ room._building }}</td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_floor">{{ room._floor }}</td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_number">{{ room._number }}</td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_name">{{ room._name }}</td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_length">{{ room._length }}</td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_width">{{ room._width }}</td>
    <td :contenteditable="editMode && !room._length && !room._width" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_surface">{{ _surface }}</td>
    <td :contenteditable="editMode" @blur="$emit('update-room', $event)" :data-number="room._number" data-param="_height">{{ room._height }}</td>
    <td>{{ _volume }}</td>
    <!-- <td contenteditable="true"
      @keyup="changed"
      @blur="changed"
      @paste="changed"
      @delete="changed"
      @focus="changed">{{ room._height }}</td> -->
    <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">{{ room.status }}</a></td>
  </tr>
</template>

<script>
import _ from 'lodash'

// https://blog.midkemia.fr/vue-js-and-editable-contents/

export default {
  name: 'rooms-line',
  props: [
    'room',
    'isImporting',
    'editMode',
    'selected'
  ],
  computed: {
    roomStatusIcon () {
      return {
        'fa-spin fa-spinner': !this.room.status,
        'fa-plus': this.room.status === 'new',
        'fa-edit': this.room.status === 'modified',
        'fa-check': this.room.status === 'unchanged'
      }
    },
    roomLineClass () {
      return {
        'has-text-warning has-text-weight-bold': this.room.status === 'modified',
        'has-text-success': this.room.status === 'new',
        'has-text-white has-background-primary': this.selected
      }
    },
    _surface () {
      return (this.room._length && this.room._width) ? _.round((this.room._length * this.room._width), 2) : this.room._surface
    },
    _volume () {
      return _.round(this._surface * this.room._height, 2)
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
    },
    handleClick (event, roomId) {
      if (!this.editMode) {
        this.$emit('select-room', roomId, event.ctrlKey)
      }
    }
  }
}
</script>

<style lang="css">
</style>
