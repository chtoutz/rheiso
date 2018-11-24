<template>
  <div id="projects-rooms">
    <div class="second-menubar">
      <a class="button" @click="importRooms()">Importer</a>
    </div>
    <table class="table is-narrow is-hoverable is-fullwidth" v-if="!rooms.length">
      <thead>
        <tr>
          <th>Bloc</th>
          <th>Niveau</th>
          <th>#</th>
          <th>Nom</th>
          <th><abbr title="Surface">S</abbr></th>
          <th><abbr title="Hauteur">H</abbr></th>
          <th><abbr title="Volume">V</abbr></th>
          <th><abbr title="Longueur">L</abbr></th>
          <th><abbr title="Largeur">l</abbr></th>
          <th v-if="$route.params.bottomTab === 'bilan-thermique'">Charges internes, déperditions en plusieurs colonnes</th>
          <th><abbr title="Ajouter des en-tête custom avec bilan aéraulique, thermique">TODO</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr class="is-selected" v-for="room in rooms">
          <th>{{ room._bloc }}</th>
          <th>{{ room._floor }}</th>
          <th>{{ room._number }}</th>
          <th>{{ room._name }}</th>
          <th>{{ room._length }}</th>
          <th>{{ room._width }}</th>
          <th>{{ room._surface }}</th>
          <th>{{ room._height }}</th>
          <th>{{ room._volume }}</th>
          <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
        </tr>
      </tbody>
    </table>

    <article class="message is-primary" v-else>
      <div class="message-body">
        Ce projet ne contient pas encore de locaux. Vous pouvez en importer depuis un tableur à l'aide du bouton dans la barre de menu, ou les ajouter un par un.
      </div>
    </article>
    <!-- <ul>
      <li v-for="worksheet in worksheets">{{worksheet.name}}</li>
    </ul> -->
    <bottom-tabs :tabs="tabs" :activeTab="$route.params.bottomTab" :defaultTab="'Locaux'" :canAddTab="true"></bottom-tabs>
    <!-- {{ worksheets }} -->
    <!-- {{ stream._readableState.pipes.jsZip.files['_rels/.rels']._data.compressedContent }} -->
  </div>
</template>

<script>
import Excel from 'exceljs'
import path from 'path'
import _ from 'lodash'

import ProjectsMixin from '@/mixins/Projects'

import Card from '@/components/Layout/Card'
import BottomTabs from '@/components/Layout/BottomTabs'

let module = {
  name: 'projects-rooms',
  components: {
    Card,
    BottomTabs
  },
  computed: {
    cardTitle () {
      return `Liste des locaux`
    },
    activeTab () {
      return _.kebabCase(this.$route.params.bottomTab)
    },
    tabs () {
      let tabs = [
        // {
        //   name: '*add*',
        //   hideName: true,
        //   icon: 'plus'
        // },
        {
          name: 'Locaux',
          to: {
            params: { bottomTab: _.kebabCase('Locaux') }
          }
        }
      ]
      if (!this.rooms.length) {
        // TODO: _.concat below extraTabs with the ones found in active plugins hooks
        let extraTabs = [
          'Bilan thermique',
          'Bilan aéraulique',
          'Synthèse'
        ]
        _.map(extraTabs, (tab, key) => {
          tabs.push({
            name: tab,
            to: {
              params: { bottomTab: _.kebabCase(tab) }
            }
          })
        })
      }
      return tabs
    }
  },
  mixins: [ ProjectsMixin ],
  data () {
    return {
      // The main Excel instance
      workbook: new Excel.Workbook(),
      rooms: []
      // activeTab: _.kebabCase(this.$router.params.show),
      // he rooms list itself
    }
  },
  mounted () {
    // TODO: Populate this.rooms from this.activeProject.rooms (loaded in fetchProject : .populate('files').populate('rooms')...)
    // this.workbook = new Excel.Workbook()
    // this.loadFile(this.activeProject.roomsFile)
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
    addRoom () {
      return `Liste des locaux`
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
        console.log(`Importing rooms from ${filename}`)
        workbook.eachSheet((worksheet, sheetId) => {
          // TODO: Check if worksheet has a recognized name (ri_nomenclatures, ri_bilan_thermique/aéraulique, ri_synthèse...)
          if (worksheet.name === 'ri_locaux') {
            // Reset the rooms to display only the ones taken from file
            this.rooms = []
            // console.log(`Loaded rooms from ${filename}`)
            worksheet.eachRow((row, rowNumber) => {
              // console.log(row)
              if (rowNumber > 1) {
                this.rooms.push({

                })
              }
            })
            // this.worksheets.push(worksheet)
          } else {
            console.log(worksheet.name)
          }
          // console.log(sheetId)
          // this.tabs.push(worksheet)
        })
        // this.worksheet = workbook.worksheets[0]
      } else {
        console.log(`Could not load rooms from ${filename}`)
      }
      // console.log(this.worksheet)
    },
    importRooms () {
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
        if (this.worksheet) {
          console.log(this.worksheet)
          // let col = this.worksheet.getColumn(1)
          // col.eachCell((cell, rowNumber) => {
          //   console.log(cell)
          // })
        }
      })
    }
  }
}

// util.inherits(module.methods.ExcelTransform(), stream.Transform)
//
// module.methods.ExcelTransform.prototype._transform = (doc, encoding, callback) => {
//   this.worksheet.addRow({ name: doc.name })
//   callback()
// }
//
// module.methods.ExcelTransform.prototype._flush = (callback) => {
//   this.workbook.commit() // commit only when you're done
//
//   var that = this
//   // bl drains the stream and create a Buffer object you can then push
//   this.workbook.stream.pipe(bl((err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     that.push(data)
//     callback()
//   }))
// }

export default module
</script>

<style lang="css">
</style>
