<template>
  <div class="hello" >
    {{myscore}}
    <div class="columns">
  <div class="column is-three-fifths">
    <canvas v-if="statusDraw === '1'" id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
    <canvas v-if="statusDraw === '0'" id="myCanvas"  width="500" height="500"></canvas>
  </div>
  <div class="column">
    <div class="myBox">
      <table class="table">
        <tr v-for="(resul,index) in result">
          <td>
           {{resul}}
          </td>
          <td></td>
          <td>
            {{ showResult[index] }}
          </td>
        </tr>
        </table>
      </div>
  </div>
</div>
<section class="hero is-warning is-medium">
    <div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter">
  </div>
</div>
<div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter"> 
    <br>
  <input  type="text" class="input is-rounded"  v-model="resultQuestion">
  <br><br>
  <button  @click="checkResult(resultQuestion)" class="button is-primary is-outlined">ส่งคำตอบ</button>
  <button class="button is-info is-outlined " @click="backPage()">ย้อนหลัง</button>  
  <br><br>
  </div> 
</div>
</section>
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
      showResult: [''],
      result: ['']
    }
  },
  computed: {
    ...mapGetters([
      'dataQuestion',
      'CurrentMatch',
      'keyPlayer',
      'statusDraw',
      'copyDrawALL',
      'countQuestion',
      'myscore'
    ])
  },
  methods: {
    ...mapActions([
      'setting',
      'saveData',
      'setting',
      'checkMatch',
      'checkStatus',
      'copyDraw',
      'nextQuestion',
      'backPage',
      'saveScore',
      'deleteDraw'
    ]),
    copy () {
      this.c = document.getElementById('myCanvas')
      this.ctx = this.c.getContext('2d')
      this.ctx.lineWidth = 5
      Object.keys(this.copyDrawALL).map((key, index) => {
        switch (this.copyDrawALL[key].type) {
          case 'moveTo':
            this.ctx.moveTo(this.copyDrawALL[key].x, this.copyDrawALL[key].y)
            break
          case 'lineTo':
            this.ctx.lineTo(this.copyDrawALL[key].x, this.copyDrawALL[key].y)
            break
          case 'stroke':
            this.ctx.stroke()
            break
        }
      })
    },
    startDraw (event) {
      this.c = document.getElementById('myCanvas')
      this.ctx = this.c.getContext('2d')
      this.ctx.lineWidth = 5
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
      this.result.push(result)
      // this.result += this.resultQuestion + '<br />'
      if (this.dataQuestion[this.countQuestion] === result) {
        this.nextQuestion()
        this.saveScore()
        this.deleteDraw()
        this.showResult.push('คำตอบถูกต้อง')
      } else {
        this.showResult.push('คำตอบไม่ถูกต้อง')
      }
      console.log(this.showResult)
    }
  },
  mounted () {
      // this.copy()
    if (this.statusDraw === '0') {
      this.copyDraw()
      this.copy()
    }
    this.setting()
    this.checkMatch()
    this.checkStatus()

    // this.c2 = document.getElementById('myCanvas2')
    // this.ctx2 = this.c2.getContext('2d')
    // this.ctx2.lineWidth = 5
  }
}
</script>
<style scoped>
canvas {
  border: 2px solid #666;
}
scroll {
    background-color: #00FFFF;
    width: 400px;
    height: 100px;
    overflow: auto;
}
body {
margin-bottom: 200%;
}

/* Box styles */
.myBox {
border: none;
padding: 5px;
font: 16px/24px sans-serif;
width: 300px;
height: 500px;
overflow: scroll;
}

/* Scrollbar styles */
::-webkit-scrollbar {
width: 12px;
height: 12px;
}

::-webkit-scrollbar-track {
background: #f5f5f5;
border-radius: 10px;
}

::-webkit-scrollbar-thumb {
border-radius: 10px;
background: #ccc;  
}

::-webkit-scrollbar-thumb:hover {
background: #999;  
}
</style>