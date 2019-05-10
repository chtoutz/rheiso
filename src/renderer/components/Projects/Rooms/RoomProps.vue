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
    <div class="tile is-parent is-vertical">
      <!-- Display tabs to switch between synthesis, walls, air flows or heat balance -->
      <article class="tile is-child">
        <props-tabs :roomProps="roomProps" @set-room-props="setRoomProps"></props-tabs>
      </article>

      <article class="tile is-child box">
        <!-- Display tabs to switch between synthesis, walls, air flows or heat balance -->
        <div class="bx" v-if="roomProps === 'synthesis'">
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

import PropsTabs from '@/components/Projects/Rooms/_RoomPropsTabs'

export default {
  name: 'room-props',
  components: {
    PropsTabs
  },
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
      roomProps: null
    }
  },
  methods: {
    drawRoomShape (walls = this.drawing.get('layer-walls'), room = this.selectedRoom) {
      // if (!walls) {
      //   walls = this.drawing.get('layer-walls')
      // }
      // if (!room && this.selectRoom) {
      //   room = this.selectedRoom
      // }
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
    setRoomProps (property = 'synthesis') {
      if (['synthesis', 'caracteristics', 'walls', 'air-supply', 'air-return', 'heat-balance', 'cool-balance'].indexOf(property) < 0) {
        property = 'synthesis'
      }
      this.roomProps = property
    }
  },
  mounted () {
    // TODO: get roomProps from entry in user.prefs.ui.roomProps
    this.roomProps = 'synthesis'
    this.drawing = SVG('drawing-zone').size('100%', '100%')
    let walls = this.drawing.group().attr({id: 'layer-walls'})
    // console.log(this, walls)
    this.drawRoomShape(walls)
    this.$watch('selectedRoom', (val, oldValue) => {
      this.drawRoomShape(walls, val)
    })
    this.$watch('roomProps', (val, oldValue) => {
      this.drawRoomShape(walls, this.selectedRoom)
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
