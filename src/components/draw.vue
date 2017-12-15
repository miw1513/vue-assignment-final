<template>
  <div class="hello" >
    <div class="columns">
  <div class="column is-half">
    <canvas id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
  </div>
  <div class="column">
    <div class="myBox">
      <table class="table">
        <tr>
          <td><p v-for="resul in result">
          {{resul}}
        </p>
        </td>
        <td></td>
          <td>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td >
        </td>
        <td></td>
          <td><br>
            <p v-for="(show,index) in showResult">
                {{ showResult[index] }}
              </p>
            </td>
          </tr>
        </table>
      </div>
  </div>
</div>
    <div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter">
    
    
  </div>
</div>
<div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter"> 
  <input  type="text" class=""  v-model="resultQuestion">
  <button  @click="checkResult(resultQuestion)" class="button is-primary is-outlined">ส่งคำตอบ</button>
  <button class="button is-primary" @click="backPage()">ย้อนหลัง</button>  
  </div> 
</div>
    ข้อที่ {{ countQuestion + 1 }}    

    <div class="columns is-gapless">
      <div v-if="statusDraw === '1'" class="column">
       
        <canvas id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
      </div>
      
      <div v-if="statusDraw === '0'" class="column">
         <canvas id="myCanvas" width="500" height="500"></canvas>
        <input  type="text" class=""  v-model="resultQuestion">
        <button  @click="checkResult(resultQuestion)" class="button is-primary is-outlined">ส่งคำตอบ</button>
      </div>
      <div class="myBox">
      <table class="table">
        <tr>
          <td><p v-for="resul in result">
          {{resul}}
        </p>
        </td>
        <td></td>
          <td>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td >
        </td>
        <td></td>
          <td><br>
            <p v-for="(show,index) in showResult">
                {{ showResult[index] }}
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
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
      showResult: [],
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
      'countQuestion'
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
      'nextQuestion'
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
        this.showResult.push('คำตอบถูกต้อง')
      } else {
        this.showResult.push('คำตอบไม่ถูกต้อง')
      }
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