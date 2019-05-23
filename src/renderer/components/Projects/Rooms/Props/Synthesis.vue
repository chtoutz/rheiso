<template>
  <div class="box">
    <p class="subtitle">Caractéristiques</p>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-3">
        <article class="tile is-child">
          <p class="heading">Murs</p>
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
</template>

<script>
export default {
  name: 'synthesis',
  props: ['selectedRoom', 'selectedMany']
}
</script>

<style lang="css">
</style>
