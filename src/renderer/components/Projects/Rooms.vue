<template>
  <div id="projects-rooms">
    <div class="second-menubar">
      <a class="button" @click="importRooms()">Importer</a>
    </div>
    <table class="table is-narrow is-hoverable is-fullwidth is-bordered" v-if="rooms.length">
      <thead>
        <tr>
          <th v-if="isImporting">Statut</th>
          <th>Bloc</th>
          <th>Niveau</th>
          <th>#</th>
          <th>Nom</th>
          <th><abbr title="Longueur">L</abbr></th>
          <th><abbr title="Largeur">l</abbr></th>
          <th><abbr title="Surface">S</abbr></th>
          <th><abbr title="Hauteur">H</abbr></th>
          <th><abbr title="Ajouter des en-tête custom avec bilan aéraulique, thermique">TODO</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{'has-text-success': room.status === 'new', 'has-text-warning has-text-weight-bold': room.status === 'modified'}" v-for="room in rooms">
          <td v-if="isImporting" @click="confirmStatus(room)">
            <span class="icon">
              <i class="fa" :class="roomStatusIcon(room.status)"></i>
            </span>
          </td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_building">{{ room._building }}</td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_floor">{{ room._floor }}</td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_number">{{ room._number }}</td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_name">{{ room._name }}</td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_length">{{ room._length }}</td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_width">{{ room._width }}</td>
          <td contenteditable="true" @blur="updateRoom" :data-number="room._number" data-param="_surface">{{ room._surface }}</td>
          <td contenteditable="true" data="_building"
            @keyup="changed"
            @blur="changed"
            @paste="changed"
            @delete="changed"
            @focus="changed">{{ room._height }}</td>
          <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">{{ room.status }}</a></td>
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
import diff from 'deep-diff'
import path from 'path'
import _ from 'lodash'

import ProjectsMixin from '@/mixins/Projects'

import Card from '@/components/Layout/Card'
import BottomTabs from '@/components/Layout/BottomTabs'

export default {
  name: 'projects-rooms',
  components: {
    Card,
    BottomTabs
  },
  computed: {
    cardTitle () {
      return `Liste des locaux`
    },
    // activeTab () {
    //   return _.kebabCase(this.$route.params.bottomTab)
    // },
    tabs () {
      let tabs = [
        {
          name: 'Locaux',
          to: {
            params: { bottomTab: _.kebabCase('Locaux') }
          }
        }
      ]
      if (this.rooms.length) {
        // TODO: _.concat below extraTabs with the ones found in active plugins hooks
        // TODO: Enable this ONLY when user is using premium version or API mode
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
      isImporting: false,
      timeoutID: null,
      rooms: this.activeProject.rooms
    }
  },
  mounted () {
    // let room1 = {_num: 12, _name: 'Local 1'}
    // let room2 = {_num: 12, _name: 'Local 1'}
    // console.log(diff(room1, room2))
    // TODO: Populate this.rooms from this.activeProject.rooms (loaded in fetchProject : .populate('files').populate('rooms')...)
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
    async addRoom (room) {
      room.project = this.activeProject._id
      await this.$DB.room.create(room)
      room.status = 'unchanged'
    },
    async updateRoom (event) {
      // console.log(event.target.dataset)
      let update = {}
      update[event.target.dataset.param] = event.target.innerText
      await this.$DB.room.updateOne({
        _number: event.target.dataset.number
      }).set(update)
      console.log(`Room ${event.target.dataset.number} updated`)
    },
    changed (event) {
      clearTimeout(this.timeoutID)
      // _self = this
      this.timeoutID = setTimeout(function () {
        console.log(event.target)
      // _self.data = $(event.target).html().trim()
      }, 1000)
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
        console.log(`Loading rooms from ${filename}`)
        // let _self = this
        workbook.eachSheet((worksheet, sheetId) => {
          // TODO: Check if worksheet has a recognized name (ri_nomenclatures, ri_bilan_thermique/aéraulique, ri_synthèse...)
          if (worksheet.name === 'ri_locaux') {
            // Reset the rooms to display only the ones taken from file
            this.rooms = []
            // Set isImporting to true to add a status column for all rooms in the file (loading, new, modified...)
            this.isImporting = true
            // console.log(`Loaded rooms from ${filename}`)
            worksheet.eachRow(async (row, rowNumber) => {
              // console.log(row)
              if (rowNumber > 1) {
                let room = {
                  _building: row.values[1],
                  _floor: row.values[2],
                  _number: row.values[3].toString(),
                  _name: row.values[4],
                  _length: row.values[5] || 0,
                  _width: row.values[6] || 0,
                  _surface: row.values[7],
                  _height: row.values[8]
                }
                // room.status = room._number === 1121 ? 'done' : await this.getRoomStatus(room)
                room.status = await this.getRoomStatus(room)
                this.rooms.push(room)
              }
            })
            // this.worksheets.push(worksheet)
          } else {
            console.log(worksheet.name)
          }
          // console.log(sheetId)
        })
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
        if (this.rooms.length) {
          console.log(`${this.rooms.length} rooms loaded`)
          // async.each(this.rooms, this.checkRoomStatus, (err) => {
          //   console.log(err)
          // })
          // col.eachCell((cell, rowNumber) => {
          //   console.log(cell)
          // })
        }
      })
    },
    async getRoomStatus (room) {
      let status
      let roomExists = await this.$DB.room.findOne({
        where: {_number: room._number},
        select: [
          '_building',
          '_floor',
          '_number',
          '_name',
          '_length',
          '_width',
          '_surface',
          '_height'
        ]
      })

      if (!roomExists) {
        status = 'new'
      } else {
        delete roomExists._id
        if (diff(room, roomExists)) {
          // TODO: Send diff result in view to display in rooms table
          status = 'modified'
        } else {
          status = 'unchanged'
        }
      }
      return status
    },
    roomStatusIcon (status) {
      return {
        'fa-spin fa-spinner': !status,
        'fa-plus': status === 'new',
        'fa-edit': status === 'modified',
        'fa-check': status === 'unchanged'
      }
    },
    async confirmStatus (room) {
      // console.log(await _self.$DB.room.find({}))
      switch (room.status) {
        case 'new':
          await this.addRoom(room)
          break
        case 'modified':
          await this.$DB.room
            .updateOne({ _number: room._number })
            .set(room)
          // await this.addRoom(room)
          break
        default:
          alert('oho..')
      }
    }
  }
}
</script>

<style lang="css">
</style>
