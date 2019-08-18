<template>
  <!-- <tr>
    <th class="column-end"><abbr title="Perte de charge régulière">ΔPr</abbr></th>

    <th class="column-start"><abbr title="Coefficient de perte de charge">ζ</abbr></th>
    <th class="column-end"><abbr title="Perte de charge singulière">ΔPs</abbr></th>

    <th class="column-end"><abbr title="Perte de charge tronçon">ΔP</abbr></th>
  </tr> -->
  <tr :class="itemLineClass" @click="handleClick($event, item.id)">
    <td class="column-start">
      {{ item.points.join('-') || '??' }}
    </td>
    <td class="column-end control" data-param="_type">
      {{ item._type || 'Gaine circulaire' }}
      <!-- <div class="field"> -->
        <!-- <div class="control has-text-centered"> -->
          <!-- <div class="select is-small">
            <select @change="alert('ok')">
              <optgroup label="Gaines">
                <option>Gaine rigide circulaire</option>
                <option>Gaine souple circulaire</option>
                <option>Gaine rigide rectangulaire</option>
              </optgroup>
              <optgroup label="Accessoires">
                <option>Coude 90°</option>
                <option>Coude 45°</option>
                <option>Coude 30°</option>
              </optgroup>
              <optgroup label="Equipements">
                <option>Registre</option>
                <option>Clapet anti-retour</option>
                <option>xxx</option>
              </optgroup>
            </select>
          </div> -->
        <!-- </div> -->
      <!-- </div> -->
    </td>
    <!-- <td class="column-end" :contenteditable="editMode" @blur="changed" data-param="_type">
      {{ item._type || 'Gaine rigide circulaire' }}
    </td> -->
    <td class="column-start has-text-weight-bold" :contenteditable="editMode" @blur="changed" data-param="flow">
      {{ item.flow.toFixed(3) }}
    </td>
    <td class="has-text-weight-bold" :contenteditable="editMode" @blur="changed" data-param="_diameter">
      {{ item._diameter }}
      <!-- <div class="field">
        <p class="control is-expanded">
          <input class="input is-static" type="float" v-model="item._diameter" placeholder="Your phone number">
        </p>
      </div> -->
    </td>
    <td class="has-text-weight-bold" :contenteditable="editMode" @blur="changed" data-param="_width">
      {{ item._width || '' }}
    </td>
    <td class="column-end" data-param="speed">
      {{ item.speed.toFixed(3) }}
    </td>
    <td class="column-start has-text-weight-bold" :contenteditable="editMode" @blur="changed" data-param="epsilon">
      {{ item.epsilon }}
    </td>
    <td class="has-text-weight-bold" :contenteditable="editMode" @blur="changed" data-param="_length">
      {{ item._length }}
    </td>
    <td data-param="Reynolds">
      {{ item.Reynolds || '' }}
    </td>
    <td data-param="lambda">
      {{ item.lambda || '' }}
    </td>
    <td class="column-end has-text-weight-bold" :contenteditable="editMode" @blur="changed" data-param="dzeta">
      {{ item.dzeta || '' }}
    </td>
    <td class="column-start" data-param="dynamicPressure">
      {{ item.dynamicPressure ? item.dynamicPressure.toFixed(0) : '-' }}
    </td>
    <td class="column" data-param="majorLoss">
      {{ item.majorLoss ? item.majorLoss.toFixed(0) : '-' }}
    </td>
    <td class="column-end" data-param="minorLoss">
      {{ item.minorLoss ? item.minorLoss.toFixed(0) : '-' }}
    </td>
    <!-- <td contenteditable="true"
      @keyup="changed"
      @blur="changed"
      @paste="changed"
      @delete="changed"
      @focus="changed">{{ room._height }}</td> -->
  </tr>
</template>

<script>
// import _ from 'lodash'

// https://blog.midkemia.fr/vue-js-and-editable-contents/

export default {
  name: 'head-loss-line',
  props: [
    'item',
    'editMode',
    'selected'
  ],
  computed: {
    itemLineClass () {
      return {
        // 'has-text-warning has-text-weight-bold': this.hasWarnings() === 'modified',
        // 'has-text-success': this.item.status === 'new',
        // 'has-text-white has-background-primary': this.selected
      }
    },
    // dimensions () {
    //   return (this.item._diameter && this.item._width) ? _.round((this.item._length * this.item._width), 2) : this.item._surface
    // },
    headLoss () {
      return this.item
    }
  },
  data () {
    return {
      timeoutID: null,
      timeoutDuration: 1000
    }
  },
  methods: {
    changed ($event) {
      console.log($event.srcElement.parentElement)
      clearTimeout(this.timeoutID)
      // _self = this
      this.timeoutID = setTimeout(function () {
        // console.log($event)
        // _self.data = $event.target.innerHTML
      }, this.timeoutDuration)
      // this.$emit('update-head-loss', $event)
    },
    handleClick ($event, roomId) {
      if (!this.editMode) {
        this.$emit('select-room', roomId, $event.ctrlKey)
      }
    }
  }
}
</script>

<style lang="css">
</style>
