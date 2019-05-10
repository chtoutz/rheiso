<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-3">
      <article class="tile is-child">
        <div v-show="selectedRoom" id="drawing-zone"></div>
        <div v-show="!selectedRoom">
          Aucun aperçu disponible
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child">
        <!-- <p class="title">Main column</p>
        <p class="subtitle">With some content</p> -->
        <div class="tabs is-boxed">
          <ul>
            <li :class="{'is-active': roomProp === 'synthesis'}">
              <a @click="roomProps('synthesis')">
                <span class="icon has-text-grey"><i class="fa fa-dashboard" aria-hidden="true"></i></span>
                <span>Synthèse</span>
              </a>
            </li>
            <li :class="{'is-active': roomProp === 'caracteristics'}">
              <a @click="roomProps('caracteristics')">
                <span class="icon has-text-grey"><i class="fa fa-building-o" aria-hidden="true"></i></span>
                <span>Caractéristiques</span>
              </a>
            </li>
            <li :class="{'is-active': roomProp === 'walls'}">
              <a @click="roomProps('walls')">
                <span class="icon has-text-grey"><i class="fa fa-music" aria-hidden="true"></i></span>
                <span>Parois</span>
              </a>
            </li>
            <li :class="{'is-active': roomProp === 'air-supply'}">
              <a @click="roomProps('air-supply')">
                <span class="icon has-text-success"><i class="fa fa-arrow-down" aria-hidden="true"></i></span>
                <span>Flux entrants</span>
              </a>
            </li>
            <li :class="{'is-active': roomProp === 'air-return'}">
              <a @click="roomProps('air-return')">
                <span class="icon has-text-primary"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
                <span>Flux sortants</span>
              </a>
            </li>
            <li :class="{'is-active': roomProp === 'heat-balance'}">
              <a @click="roomProps('heat-balance')">
                <span class="icon has-text-danger"><i class="fa fa-sun-o" aria-hidden="true"></i></span>
                <span>Bilan été</span>
              </a>
            </li>
            <li :class="{'is-active': roomProp === 'cool-balance'}">
              <a @click="roomProps('cool-balance')">
                <span class="icon has-text-info"><i class="fa fa-snowflake-o" aria-hidden="true"></i></span>
                <span>Bilan hiver</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="cotent"> -->
        <div class="box" v-if="roomProp === 'synthesis' || roomProp === 'caracteristics'">
          <p class="subtitle">Caractéristiques</p>

          <div class="tile is-ancestor">
            <div class="tile is-parent is-3">
              <article class="tile is-child">
                <div class="field">
                  <label class="label">Longueur</label>
                  <div class="control">
                    <input class="input" type="text" :placeholder="selectedMany ? '* Varie *' : 'Longueur du local'" v-model="selectedRoom._length">
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-3">
              <article class="tile is-child">
                <div class="field">
                  <label class="label">Largeur</label>
                  <div class="control">
                    <input class="input" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Largeur du local'" v-model="selectedRoom._width">
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent is-3">
              <article class="tile is-child">
                <div class="field">
                  <label class="label">Hauteur</label>
                  <div class="control">
                    <input class="input" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Hauteur du local'" v-model="selectedRoom._height">
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="field">
                  <label class="label">Surface</label>
                  <div class="control">
                    <input class="input" :class="{'is-static': selectedRoom._height}" type="text" :placeholder="selectedMany ? '* Varie *' : 'Surface du local'" v-model="selectedRoom._surface">
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="field">
                  <label class="label">Volume</label>
                  <div class="control">
                    <input class="input" :class="{'is-static': selectedRoom._height}" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Volume du local'" v-model="selectedRoom._volume">
                  </div>
                </div>
              </article>
            </div>
          </div>

        </div>
      </article>
    </div>
  </div>
</template>

<script>
import SVG from 'svg.js'

export default {
  name: 'room-props',
  props: [
    'selectedRooms'
  ],
  computed: {
    selectedRoom () {
      if (this.selectedRooms.length === 1) {
        return this.selectedRooms[0]
      } else {
        return false
      }
    },
    selectedNone () {
      return !this.selectedRooms.length
    },
    selectedMany () {
      return this.selectedRooms.length > 1
    }
  },
  watch: {
    // selectedRoom: (newValue, oldValue) => {
    //   if (newValue) {
    //     console.log('ok')
    //   }
    // }
  },
  data () {
    return {
      drawing: null,
      // TODO: get roomProp from entry in user.prefs.ui.roomProp
      roomProp: 'synthesis'
    }
  },
  methods: {
    drawRoomShape (walls = this.drawing.get('layer-walls'), room = this.selectedRoom) {
      if (!walls || !room) {
        console.log('no walls or room to generate shape')
        return false
      }
      walls.clear()
      // Let's see what is the room geometry...
      //
      // If it has a length and width, assume that it's a rectangle
      // (LENGTH is HORIZONTAL, and WIDTH is VERTICAL)
      if (room._length && room._width) {
        let rect = walls.rect(room._width, room._length).attr({
          'fill': 'none',
          'stroke': 'white',
          'stroke-width': 3
        })
        let root = rect.doc().node

        // Let's resize rectangle based on current svg container dimensions
        if (room._length > room._width) {
          // We have a vertical rectangle...
          let rectHeight = Math.min(root.clientHeight * 0.75, 200)
          rect.size(null, rectHeight)
        } else {
          // ... Or an horizontal
          let rectWidth = Math.min(root.clientWidth * 0.67, 200)
          rect.size(rectWidth)
        }

        // After resizing, we center to the correct position
        rect.center(root.clientWidth / 2, root.clientHeight / 2)
      }
    },
    roomProps (property) {
      if (!property || ['synthesis', 'caracteristics', 'walls', 'air-supply', 'air-return', 'heat-balance', 'cool-balance'].indexOf(property) < 0) {
        property = 'synthesis'
      }
      this.roomProp = property
    }
  },
  mounted () {
    // this.de()
    this.drawing = SVG('drawing-zone').size('100%', '100%')
    let walls = this.drawing.group().attr({id: 'layer-walls'})
    // console.log(this, walls)
    this.drawRoomShape(walls)
    this.$watch('selectedRoom', (val, oldValue) => {
      this.drawRoomShape(walls, val)
    })
  }
}
</script>

<style scoped>
#drawing-zone {
  height: 100%;
  width: 100%;
  /*margin: 0;
  padding: 0;*/
  /* background: rgba(21, 159, 159, 0.4); */
  background: rgba(34, 144, 203, 0.5);
}

.tabs ul {
  margin: 0
}
</style>
