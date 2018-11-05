<template>
  <div id="projects-rooms">
    <card :cardTitle="cardTitle" :card-menu="true" v-if="true">
      <!-- Card menu -->
      <div slot="menu" class="dropdown-content">
        <a class="dropdown-item">
          Importer une liste
        </a>
        <a class="dropdown-item">
          Exporter les locaux
        </a>
      </div>
      <!-- Filetree -->
      <!-- <filetree :tree="rootFolder"></filetree> -->
      <p class="content">
        11 locaux répartis sur 2 niveaux
      </p>
      <table class="table is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th><abbr title="Longueur">L</abbr></th>
            <th><abbr title="Largeur">l</abbr></th>
            <th><abbr title="Surface">S</abbr></th>
            <th><abbr title="Hauteur">H</abbr></th>
            <th><abbr title="Volume">V</abbr></th>
            <th><abbr title="Goals against">GA</abbr></th>
            <th><abbr title="Goal difference">GD</abbr></th>
            <th><abbr title="Points">Pts</abbr></th>
            <th>Qualification or relegation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
            </td>
            <td>38</td>
            <td>23</td>
            <td>12</td>
            <td>3</td>
            <td>68</td>
            <td>36</td>
            <td>+32</td>
            <td>81</td>
            <td><a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
          </tr>
          <tr class="is-selected">
            <th>2</th>
            <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
            <td>38</td>
            <td>20</td>
            <td>11</td>
            <td>7</td>
            <td>65</td>
            <td>36</td>
            <td>+29</td>
            <td>71</td>
            <td><a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
          </tr>
          <tr>
            <th>3</th>
            <td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
            <td>38</td>
            <td>19</td>
            <td>13</td>
            <td>6</td>
            <td>69</td>
            <td>35</td>
            <td>+34</td>
            <td>70</td>
            <td><a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
          </tr>
          <tr>
            <th>4</th>
            <td><a href="https://en.wikipedia.org/wiki/Manchester_City_F.C." title="Manchester City F.C.">Manchester City</a></td>
            <td>38</td>
            <td>19</td>
            <td>9</td>
            <td>10</td>
            <td>71</td>
            <td>41</td>
            <td>+30</td>
            <td>66</td>
            <td><a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Play-off_round" title="2016–17 UEFA Champions League">Champions League play-off round</a></td>
          </tr>
        </tbody>
      </table>
      <!-- Card footer -->
      <footer slot="footer" class="card-footer">
        <a class="card-footer-item" @click="importRooms()">
          <span class="heading">
            Importer des locaux
          </span>
        </a>
        <a class="card-footer-item">
          <span class="heading">
            Exporter la liste
          </span>
        </a>
      </footer>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Layout/Card'

export default {
  name: 'projects-rooms',
  components: {
    Card
  },
  computed: {
    cardTitle () {
      return `Liste des locaux`
    }
  },
  data () {
    return {
      rooms: null
    }
  },
  mounted () {
    // TODO: Populate this.rooms from this.activeProject.rooms (loaded in fetchProject : .populate('files').populate('rooms')...)
  },
  methods: {
    addRoom () {
      return `Liste des locaux`
    },
    importRooms () {
      // let _self = this
      const dialog = {
        properties: ['openFile'],
        defaultPath: this.$settings.get('activeProject.path'),
        filters: [
          {name: 'Tableur', extensions: ['xls', 'xlsx', 'xlsm']},
          {name: 'CSV', extensions: ['csv']},
          {name: 'Tous les fichiers', extensions: ['*']}
        ]
      }
      this.$electron.remote.dialog.showOpenDialog(dialog, function (roomsFile, bookmarks) {
        console.log(roomsFile)
      })
    }
  }
}
</script>

<style lang="css">
</style>
