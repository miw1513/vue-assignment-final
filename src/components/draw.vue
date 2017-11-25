<template>
  <div class="hello">
    <button class="button is-large" @click="copy">copy</button>
    <br><br>
    <hr>
    <canvas id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
    <canvas id="myCanvas2" width="500" height="500"></canvas>
  </div>
</template>

<script>
import firebase from 'firebase'
import _ from 'underscore'
let config = {
  apiKey: 'AIzaSyDdq92cBZ4Mv5VdbHGfVnE0q4ZlTctvIeg',
  authDomain: 'vue-assignment.firebaseapp.com',
  databaseURL: 'https://vue-assignment.firebaseio.com',
  projectId: 'vue-assignment',
  storageBucket: 'vue-assignment.appspot.com',
  messagingSenderId: '812344967443'
}
firebase.initializeApp(config)
const db = firebase.database()

function test () {
  console.log('3333333')
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      ctx: {},
      ctx2: {},
      drawing: false,
      picture: [],
      data: [],
      c: {},
      c2: {},
      timeout: undefined
    }
  },
  computed: {
  },
  methods: {
    copy () {
      var ref = firebase.database().ref('draw/')
      ref.on('value').then(snapshot => {
        const drawData = snapshot.val()
        Object.keys(drawData).map((key, index) => {
          switch (drawData[key].type) {
            case 'moveTo':
              this.ctx2.moveTo(drawData[key].x, drawData[key].y)
              break
            case 'lineTo':
              this.ctx2.lineTo(drawData[key].x, drawData[key].y)
              break
            case 'stroke':
              this.ctx2.stroke()
              break
          }
        })
      })
    },
    startDraw (event) {
      this.ctx.moveTo(event.offsetX, event.offsetY)
      this.saveData('moveTo', event.offsetX, event.offsetY)
      this.drawing = true
    },
    stopDraw () {
      this.drawing = false
    },
    drawLine (event) {
      if (this.drawing) {
        this.ctx.lineTo(event.offsetX, event.offsetY)
        this.ctx.stroke()
        this.saveData('lineTo', event.offsetX, event.offsetY)
        this.saveData('stroke', 0, 0)
      }
    },
    saveData (type, x, y) {
      this.picture.push({
        type,
        x,
        y
      })
      db.ref('draw/').set(this.picture)
      // _.debounce(this.copy, 1000)
      // _.debounce(test, 500)
      this.copy()
    }
  },
  mounted () {
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.ctx.lineWidth = 5
    this.c2 = document.getElementById('myCanvas2')
    this.ctx2 = this.c2.getContext('2d')
    this.ctx2.lineWidth = 5
  }
}
</script>

<style scoped>
canvas {
  border: 2px solid #666;
}
</style>