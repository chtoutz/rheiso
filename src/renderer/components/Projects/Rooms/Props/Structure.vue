<template>
  <div :class="rootClass">
    <p class="subtitle" v-if="roomProps === 'synthesis'">Structure</p>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <!-- <p class="heading">Murs extérieurs</p> -->
          <nav class="panel">
            <!-- <p class="panel-heading">
              repositories
            </p> -->
            <!-- <div class="panel-block">
              <p class="control has-icons-left">
                <input class="input is-small" type="text" placeholder="search">
                <span class="icon is-small is-left">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div> -->
            <p class="panel-tabs">
              <a class="is-active">tout</a>
              <a>murs extérieurs</a>
              <a>murs intérieurs</a>
              <a>plancher</a>
              <a>toiture</a>
            </p>
            <a class="panel-block is-active">
              <span class="panel-icon">
                <i class="fa fa-book" aria-hidden="true"></i>
              </span>
              MUR EXT 1
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fa fa-book" aria-hidden="true"></i>
              </span>
              marksheet
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fa fa-book" aria-hidden="true"></i>
              </span>
              minireset.css
            </a>
            <!-- <label class="panel-block">
              <input type="checkbox">
              remember me
            </label> -->
            <div class="panel-block">
              <button class="button is-link is-outlined is-fullwidth">
                <span class="icon is-small">
                  <i class="fa fa-plus"></i>
                </span>
              </button>
            </div>
          </nav>
        </article>
      </div>

      <!-- <div class="tile is-parent is-3">
        <article class="tile is-child">
          <div class="field">
            <label class="label">Largeur</label>
            <div class="control">
              <input class="input" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Largeur du local'" v-model="selectedRoom._width">
            </div>
          </div>
        </article>
      </div> -->

      <!-- <div class="tile is-parent is-3">
        <article class="tile is-child">
          <div class="field">
            <label class="label">Hauteur</label>
            <div class="control">
              <input class="input" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Hauteur du local'" v-model="selectedRoom._height">
            </div>
          </div>
        </article>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'structure',
  props: ['roomProps', 'selectedRoom', 'selectedMany'],
  computed: {
    rootClass () {
      return {'bx': this.roomProps === 'synthesis'}
    }
  }
}
</script>

<style lang="css">
</style>
