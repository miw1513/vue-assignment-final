<template>
  <div class="hello">
    <div class="container">
      <button class="button is-primary" @click="createroom () "> CREATE ROOM </button>
    <br>
      
         <table class="table">
           <tr>
             <th></th>
             <th>ชื่อ</th>
             <th>จำนวนคน</th>
             <th></th>
           </tr>
           <tr v-for="(user, index) in userCreate">
             <td><img :src="user.fb.photoURL" alt=""></td>
             <td><h1>{{user.fb.displayName}}</h1></td>
             <td>0/5</td>
             <td><button class="button is-link" @click="joinRoomLobby(Partys[index].idhost)">เข้าร่วมห้อง</button></td>
           </tr>
         </table>
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
      'loadpartys',
      'joinRoom'
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
    },
    joinRoomLobby (matchID) {
      this.joinRoom(matchID)
    }
  },
  computed: {
    ...mapGetters([
      'keyPlayer',
      'Partys',
      'userCreate'
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
