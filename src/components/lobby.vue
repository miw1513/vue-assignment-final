<template>
  <div class="hello">
 
      <button class="button is-primary" @click="createroom () "> CREATE ROOM </button>
    <br>
       <div v-for="party in Partys">        
      {{party.idhost}}
      <button class="button is-primary" > JOIN </button>
      <br><br>
    </div>
  </div>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setting',
      'saveData',
      'setting',
      'createparty',
      'init',
      'loadpartys'
    ]),
    createroom () {
      var obj = {
        idhost: this.keyPlayer,
        idplayer1: '',
        idplayer2: '',
        idplayer3: '',
        idplayer4: ''
      }
      this.createparty(obj)
    }
  },
  computed: {
    ...mapGetters([
      'keyPlayer',
      'Partys'
    ])
  },
  created () {
    this.init()
    this.loadpartys()
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
