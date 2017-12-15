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
    <div class="columns" v-for="n in 5">
        <div class="column">
        </div>
        <div class="column">
          <hr>
          <p class="heading">Rank</p>
          <p class="title">{{ n }} </p>
          <p class="header" id="name">
          <img src="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.0-9/23168020_1495904673820107_3419867865395687176_n.jpg?oh=cc10c9fe768e8f419c6fb0f35f30039a&oe=5A8BE786">
          <br> 
            Goh Nanthawad Promsorn</p>
        </div>
        <div class="column">
            <hr>
            <br><br><br>
              <p class="title"> SCORE : ??? </p>
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
      'isReady'
    ])
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ])
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
