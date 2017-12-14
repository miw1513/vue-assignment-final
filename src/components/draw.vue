<template>
  <div class="hello">
    <h1>{{showResult}}</h1>
    <br><br>
    <hr>

    
    <!-- <canvas id="myCanvas2" width="500" height="500"></canvas> -->
    <div class="columns">
      <div class="column">
        <canvas id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
      </div>
      <div class="column is-one-fifth">
      <p v-for="resul in result">
      {{resul}}
    </p>
    </div>
    </div>

    <input type="text" v-model="resultQuestion"><button @click="checkResult(resultQuestion)">ส่งคำตอบ</button>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
      resultQuestion: '',
      showResult: '',
      countQuestion: 0,
      result: ['']
    }
  },
  computed: {
    ...mapGetters([
      'dataQuestion'
    ])
  },
  methods: {
    ...mapActions([
      'setting',
      'saveData',
      'setting'
    ]),
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
      var picture = {}
      picture = {
        type: 'moveTo',
        x: event.offsetX,
        y: event.offsetY
      }
      this.saveData(picture)
      this.drawing = true
    },
    stopDraw () {
      this.drawing = false
    },
    drawLine (event) {
      if (this.drawing) {
        this.ctx.lineTo(event.offsetX, event.offsetY)
        this.ctx.stroke()
        var picture = {}
        picture = {
          type: 'lineTo',
          x: event.offsetX,
          y: event.offsetY
        }
        this.saveData(picture)
        picture = {
          type: 'stroke',
          x: event.offsetX,
          y: event.offsetY
        }
        this.saveData(picture)
        // this.saveData('lineTo', event.offsetX, event.offsetY)
        // this.saveData('stroke', 0, 0)
      }
    },
    checkResult (result) {
      console.log(result)
      this.result.push(this.resultQuestion)
      // this.result += this.resultQuestion + '<br />'
      if (this.dataQuestion[this.countQuestion] === result) {
        console.log('push คะแนนเข้า firebase ตาม user ที่ได้คะแนนpush ลำดับคำถามเข้า firebase')
        this.countQuestion++
        this.showResult = 'คำตอบถูกต้อง'
      } else {
        this.showResult = 'คำตอบไม่ถูกต้อง'
      }
    }
      // this.copy()
  },
  mounted () {
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.ctx.lineWidth = 5
    // this.c2 = document.getElementById('myCanvas2')
    // this.ctx2 = this.c2.getContext('2d')
    // this.ctx2.lineWidth = 5
    this.setting()
  }
}
</script>

<style scoped>
canvas {
  border: 2px solid #666;
}
</style>