<template>


<section class="hero is-warning is-medium">
  <div class="hero-body">
<nav class="level">
 <div class="level-right">
    <router-link v-bind:to="'lobby'">
    <a class="button is-info is-outlined is-large">GO TO LOBBY</a>
    </router-link> 
    </div>
    <div class="level-left">
    <a class="button is-danger is-outlined is-large" @click="logout()">LOGOUT</a>
    <!-- <p class="level-item"><a class="button is-success"> LOGOUT </a></p> -->
    </div>
</nav>

  <div class="Content ">
    <p class="title"> 
      DRAWSOMETHING      
    </p>
    <p class="title">   
      TOP 5 HIGH SCORE
    </p>
    <div class="columns" v-for="(user,index,n) in scoreboard">
        <div class="column">
        </div>
        <div class="column">
          <hr>
          <p class="heading">Rank</p>
          <p class="title">{{ n+1 }} </p>
          <p class="header" id="name">
            <img :src= "user.picture" >
          <!-- <img src: ="user.picture"> -->
         
          <br> 
            {{user.name}}</p>
        </div>
        <div class="column">
            <hr>
            <br><br><br>
              <p class="title"> SCORE : {{user.score}} </p>
              
        </div>
        <div class="column">
        </div>
    </div>


  </div>
  </div>
</section>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isReady',
      'scoreboard'
    ])
  },
  methods: {
    ...mapActions([
      'login',
      'logout',
      'getscoreboard'
    ])
  },
  created () {
    this.getscoreboard()
  }
}
</script>
<style>
    #name {
      /* color: #7FFFD4;   */
    }
    img {
      border-radius: 100%;
      width: 50px;
      height: 50px
    }
    
</style>
