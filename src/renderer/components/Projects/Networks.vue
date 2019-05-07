<template>
  <section class="section" id="projects-networks">
    <div class="second-menubar">
      <a class="button" @click="importNetworks()">Importer</a>
    </div>
    <table class="table is-narrow is-hoverable is-fullwidth is-bordered" v-if="networks.length">
      <thead>
        <tr>
          <th>Elément</th>
          <th>Largeur</th>
          <th>Hauteur ou Diamètre</th>
          <th>Débit</th>
          <th>Dzeta</th>
        </tr>
      </thead>
      <tbody>
        <network-line
          v-for="network in networks"
          :key="network._id"
          :_building="network._building"
          :_floor="network._floor"
          :_number="network._number"
          :_name="network._name"
          :_length="network._length"
          :_width="network._width"
          :_surface="network._surface"
          :_height="network._height"
          :status="network.status"
          :network="network"
          :isImporting="isImporting"
          @update-network="updateRoom">
        </network-line>
      </tbody>
    </table>

    <article class="message is-primary" v-else>
      <div class="message-body">
        Ce projet ne contient pas encore de réseaux. Vous pouvez en importer depuis un tableur à l'aide du bouton dans la barre de menu, ou les ajouter un par un.
      </div>
    </article>
    <!-- <ul>
      <li v-for="worksheet in worksheets">{{worksheet.name}}</li>
    </ul> -->
    <!-- {{ worksheets }} -->
    <!-- {{ stream._readableState.pipes.jsZip.files['_rels/.rels']._data.compressedContent }} -->
  </section>
</template>

<script>
import path from 'path'
import _ from 'lodash'

import ProjectsMixin from '@/mixins/Projects'

import Card from '@/components/Layout/Card'

import NetworkElement from '@/components/Projects/Networks/NetworkElement'

export default {
  name: 'projects-networks',
  components: {
    Card,
    NetworkElement
  },
  computed: {
    cardTitle () {
      return `Réseaux CVC`
    },
    // activeTab () {
    //   return _.kebabCase(this.$route.params.bottomTab)
    // },
    tabs () {
      let tabs = [
        {
          name: 'Réseaux',
          to: {
            params: { bottomTab: _.kebabCase('Réseaux') }
          }
        }
      ]
      return tabs
    }
  },
  mixins: [ ProjectsMixin ],
  data () {
    return {
      // The main Excel instance
      isImporting: false,
      networks: []
    }
  },
  mounted () {
    this.loadProjectNetworks()
    // let network1 = {_num: 12, _name: 'Local 1'}
    // let network2 = {_num: 12, _name: 'Local 1'}
    // console.log(diff(network1, network2))
    // TODO: Populate this.networks from this.activeProject.networks (loaded in fetchProject : .populate('files').populate('networks')...)
    // this.loadFile(this.activeProject.networksFile)
    // this.workbook = new Excel.stream.xlsx.WorkbookWriter()
    // this.worksheet = this.workbook.addWorksheet('sheet 1')
    // this.worksheet.columns = [{
    //   header: 'Name',
    //   key: 'name'
    // }]
    //
    // let rs = new stream.Readable({ objectMode: true })
    // rs.push({ name: 'one' })
    // rs.push({ name: 'two' })
    // rs.push({ name: 'three' })
    // rs.push(null)

    // console.log(this.worksheet)

    // rs.pipe(this.ExcelTransform({
    //   workbook: this.workbook,
    //   worksheet: this.worksheet
    // })).pipe(process.stdout)
  },
  methods: {
    async addRoom (network = {}) {
      network.project = this.activeProject._id
      await this.$DB.network.create(network)
      network.status = 'unchanged'
    },
    async updateRoom (event) {
      // console.log(event.target.dataset)
      let update = {}
      update[event.target.dataset.param] = event.target.innerText
      await this.$DB.network.updateOne({
        _number: event.target.dataset.number
      }).set(update)
      this.loadProjectNetworks()
      console.log(`Room ${event.target.dataset.number} updated`)
    },
    // Dynamic function to load networks from $DB based on activeProject
    async loadProjectNetworks () {
      this.networks = await this.$DB.network.find({project: this.activeProject._id})
    },
    async loadFile (filename) {
      let workbook = null
      switch (path.extname(filename)) {
        case '.csv':
          workbook = await this.workbook.csv.readFile(filename)
          break
        case '.xlsx':
          workbook = await this.workbook.xlsx.readFile(filename)
          break
        case '.json':
          // TODO: Handle
          break
        case '.txt':
          // TODO: Handle
          break
        default:
          console.log(`Imports from ${path.extname(filename)} are not supported... Yet !`)
      }
      // If workbook is defined, means that reading from filename is OK. Assign
      if (workbook) {
        console.log(`Loading networks from ${filename}`)
        // let _self = this
        workbook.eachSheet((worksheet, sheetId) => {
          // TODO: Check if worksheet has a recognized name (ri_nomenclatures, ri_bilan_thermique/aéraulique, ri_synthèse...)
          if (worksheet.name === 'ri_locaux') {
            // Reset the networks to display only the ones taken from file
            this.networks = []
            // Set isImporting to true to add a status column for all networks in the file (loading, new, modified...)
            this.isImporting = true
            // console.log(`Loaded networks from ${filename}`)
            worksheet.eachRow(async (row, rowNumber) => {
              // console.log(row)
              if (rowNumber > 1) {
                let network = {
                  _building: row.values[1],
                  _floor: row.values[2],
                  _number: row.values[3].toString(),
                  _name: row.values[4],
                  _length: row.values[5] || 0,
                  _width: row.values[6] || 0,
                  _surface: row.values[7],
                  _height: row.values[8]
                }
                // network.status = network._number === 1121 ? 'done' : await this.getRoomStatus(network)
                network.status = await this.getRoomStatus(network)
                this.networks.push(network)
              }
            })
            // this.worksheets.push(worksheet)
          } else {
            console.log(worksheet.name)
          }
          // console.log(sheetId)
        })
      } else {
        console.log(`Could not load networks from ${filename}`)
      }
      // console.log(this.worksheet)
    },
    importNetworks () {
      let _self = this
      const dialog = {
        properties: ['openFile'],
        defaultPath: _self.$settings.get('activeProject.path'),
        // TODO: Handle json and txt imports
        filters: [
          {name: 'Tous les fichiers', extensions: [ 'xlsx', 'csv', 'json', 'txt' ]},
          {name: 'Tableur', extensions: ['xlsx']},
          {name: 'CSV', extensions: ['csv']},
          {name: 'JSON', extensions: ['json']}
        ]
      }
      _self.$electron.remote.dialog.showOpenDialog(dialog, async (filenames) => {
        let filename = filenames[0]
        await _self.loadFile(filename)
        if (this.networks.length) {
          console.log(`${this.networks.length} networks loaded`)
          // col.eachCell((cell, rowNumber) => {
          //   console.log(cell)
          // })
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
