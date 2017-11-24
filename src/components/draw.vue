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
export default {
  name: 'HelloWorld',
  data () {
    return {
      ctx: {},
      ctx2: {},
      drawing: false,
      picture: [],
      data: []
    }
  },
  computed: {
  },
  methods: {
    copy () {
      console.log('this is copy')
      var ref = firebase.database().ref('draw/')
      ref.once('value').then(function (snapshot) {
        this.data = snapshot.val()
      })
      this.data.map((data) => {
        switch (data.type) {
            case 'moveTo':
              this.ctx2.moveTo(data.x, data.y)
              break
            case 'lineTo':
              this.ctx2.lineTo(data.x, data.y)
              break
            case 'stroke':
              this.ctx2.stroke()
              break
          }
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
      this.copy()
    }
  },
  mounted () {
    var c = document.getElementById('myCanvas')
    this.ctx = c.getContext('2d')
    this.ctx.lineWidth = 5

    var c2 = document.getElementById('myCanvas2')
    this.ctx2 = c2.getContext('2d')
    this.ctx2.lineWidth = 5
  }
}
</script>

<style scoped>
canvas {
  border: 2px solid #666;
}
</style>