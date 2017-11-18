<template>
  <div class="hello">
    <h1>Hello</h1>
    <button class="button is-large" @click="copy">copy</button>
    <br><br>
    <hr>
    <canvas id="myCanvas" width="500" height="500" @mousemove="drawLine($event)" @mousedown="startDraw($event)" @mouseup="stopDraw"></canvas>
    <canvas id="myCanvas2" width="500" height="500"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      ctx: {},
      ctx2: {},
      drawing: false,
      picture: []
    }
  },
  methods: {
    copy () {
      this.picture.forEach(point => {
        switch (point.type) {
          case 'moveTo':
            this.ctx2.moveTo(point.x, point.y)
            break
          case 'lineTo':
            this.ctx2.lineTo(point.x, point.y)
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