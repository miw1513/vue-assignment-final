<template>
  <div class="hello">
    <h1>{{showResult}}</h1>
    <br><br>
    <hr>

    <canvas id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
    <!-- <canvas id="myCanvas2" width="500" height="500"></canvas> -->
    <input type="text" v-model="resultQuestion"><button @click="checkResult(resultQuestion)">ส่งคำตอบ</button>
    
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
      data: [],
      c: {},
      c2: {},
      dataQuestion: [],
      resultQuestion: '',
      showResult: '',
      countQuestion: 0
    }
  },
  computed: {
  },
  methods: {
    // copy () {
    //   var ref = firebase.database().ref('draw/match')
    //   ref.once('value').then(snapshot => {
    //     const drawData = snapshot.val()
    //     Object.keys(drawData).map((key, index) => {
    //       switch (drawData[key].type) {
    //         case 'moveTo':
    //           this.ctx2.moveTo(drawData[key].x, drawData[key].y)
    //           break
    //         case 'lineTo':
    //           this.ctx2.lineTo(drawData[key].x, drawData[key].y)
    //           break
    //         case 'stroke':
    //           this.ctx2.stroke()
    //           break
    //       }
    //     })
    //   })
    // },
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
    checkResult (result) {
      console.log(result)
      if (this.dataQuestion[this.countQuestion] === result) {
        console.log('push คะแนนเข้า firebase ตาม user ที่ได้คะแนนpush ลำดับคำถามเข้า firebase')
        this.countQuestion++
        this.showResult = 'คำตอบถูกต้อง'
      } else {
        this.showResult = 'คำตอบไม่ถูกต้อง'
      }
    },
    saveData (type, x, y) {
      this.picture.push({
        type,
        x,
        y
      })
      db.ref('draw/match').set(this.picture)
      // this.copy()
    }
  },
  mounted () {
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.ctx.lineWidth = 5
    // this.c2 = document.getElementById('myCanvas2')
    // this.ctx2 = this.c2.getContext('2d')
    // this.ctx2.lineWidth = 5
    var ref = firebase.database().ref('question')
    ref.once('value').then(snapshot => {
      const questionData = snapshot.val()
      Object.keys(questionData).map((key, index) => {
        this.dataQuestion.push(questionData[key])
      })
    }
    )
    console.log(this.dataQuestion)
  }
}
</script>

<style scoped>
canvas {
  border: 2px solid #666;
}
</style>