<template>
  <div id="projects-rooms">
    <div class="second-menubar">
      <a class="button" @click="importRooms()">Importer</a>
    </div>
    <table class="table is-narrow is-hoverable is-fullwidth" v-if="workbook">
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
    <div class="" v-else>
      Pas de workbook
    </div>
    <!-- {{ worksheet }} -->
    <!-- {{ stream._readableState.pipes.jsZip.files['_rels/.rels']._data.compressedContent }} -->
  </div>
</template>

<script>
import Excel from 'exceljs'
import path from 'path'
// import stream from 'stream'
// import util from 'util'
// import bl from 'bl'

import ProjectsMixin from '@/mixins/Projects'

import Card from '@/components/Layout/Card'

// var ExcelTransform = (options) => {
//   stream.Transform.call(this, { objectMode: true })
//
//   module.data.workbook = options.workbook
//   // you can make module.data optional by checking for it and
//   // creating an empty worksheet if none provided
//   module.data.worksheet = options.worksheet
// }

let module = {
  name: 'projects-rooms',
  components: {
    Card
  },
  computed: {
    cardTitle () {
      return `Liste des locaux`
    }
  },
  mixins: [ ProjectsMixin ],
  data () {
    return {
      // The main Excel instance
      workbook: new Excel.Workbook(),
      worksheet: null,
      // The input stream to the rooms list file (most likely .xslx)
      stream: null,
      // he rooms list itself
      rooms: null
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
    // ExcelTransform (options) {
    //   stream.Transform.call(this, { objectMode: true })
    //
    //   this.workbook = options.workbook
    //   // you can make this optional by checking for it and
    //   // creating an empty worksheet if none provided
    //   this.worksheet = options.worksheet
    // },
    async loadFile (filename) {
      let roomsFile = null
      switch (path.extname(filename)) {
        case '.csv':
          roomsFile = await this.workbook.csv.readFile(filename)
          // TODO: get the worksheets index from a $router.params
          this.worksheet = roomsFile.worksheets[0]
          break
        case '.xlsx':
          roomsFile = await this.workbook.xlsx.readFile(filename)
          // TODO: get the worksheets index from a $router.params
          this.worksheet = roomsFile.worksheets[0]
          break
        case '.json':
          // TODO: Handle
          console.log(`Imports from ${path.extname(roomsFile)} are not supported... Yet`)
          break
        case '.txt':
          // TODO: Handle
          console.log(`Imports from ${path.extname(roomsFile)} are not supported... Yet`)
          break
        default:
          console.log(`Imports from ${path.extname(roomsFile)} are not supported.`)
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
        console.log(`Importing rooms from ${filenames[0]}`)
        await _self.loadFile(filenames[0])
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
