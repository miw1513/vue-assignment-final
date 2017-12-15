<template>
  <div class="hello">
    

    
  
    <div class="columns is-gapless">
      <div class="column">

       <button @click="copyDraw">ddd</button>
        <canvas v-if="statusDraw === '1'" id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
        <!-- <canvas v-if="statusDraw === '0'"  id="myCanvas" width="500" height="500"></canvas> -->
        <input v-if="statusDraw === '0'" type="text" class="" placeholder="" v-model="resultQuestion"><button v-if="statusDraw === '0'" @click="checkResult(resultQuestion)" class="button is-primary is-outlined">ส่งคำตอบ</button>
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
                {{showResult[index]}}
              </p>
          </td>
        </tr>
      </table>
<<<<<<< HEAD
=======
      </div>
      <div class="column is-one-fifth">
        
      </div>
      <div class="column is-half">
          <div class="column is-one-quarter">
              
          </div>
        </div>
>>>>>>> bda57be46996d4b33a0bfaec8c0d1c9512f3324c
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
      countQuestion: 0,
      result: ['']
    }
  },
  computed: {
    ...mapGetters([
      'dataQuestion',
      'CurrentMatch',
      'keyPlayer',
      'statusDraw'
    ])
  },
  methods: {
    ...mapActions([
      'setting',
      'saveData',
      'setting',
      'checkMatch',
      'checkStatus',
      'copyDraw'
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
        this.showResult.push('คำตอบถูกต้อง')
      } else {
        this.showResult.push('คำตอบไม่ถูกต้อง')
      }
    }
      // this.copy()
  },
  mounted () {
    this.setting()
    this.checkMatch()
    this.checkStatus()
    this.c = document.getElementById('myCanvas')
    this.ctx = this.c.getContext('2d')
    this.ctx.lineWidth = 5
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
font: 24px/36px sans-serif;
width: 200px;
height: 200px;
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