<template>

  <div class="Content ">
   <p class="title"> 
     DRAWSOMETHING
   </p>
   <p class="title">   
     TOP 5 HIGH SCORE
   </p>
   
   <!-- <div class="columns" v-for="n in 5">
      <li v-for="1 in 10">    
      <hr>
      <div class="column">
        <p class="heading">Rank</p>
        <p class="title">{{ n }} </p>
        <p class="header" id="name">
        <img src="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.0-9/23168020_1495904673820107_3419867865395687176_n.jpg?oh=cc10c9fe768e8f419c6fb0f35f30039a&oe=5A8BE786">
        <br> Goh Nanthawad Promsorn</p>
      </div>
      <div class="column" style="color : red">
        อันนี้มันต้องอยู่ทางขวาาาาาสิว้ะ<br>
        SCORE : ???
      </div>    
   </div>
  </div> -->

  <div class="columns" v-for="n in 5">
    <div class="column">

    </div>
    <div class="column">
      <hr>
       <p class="heading">Rank</p>
        <p class="title">{{ n }} </p>
        <p class="header" id="name">
        <img src="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.0-9/23168020_1495904673820107_3419867865395687176_n.jpg?oh=cc10c9fe768e8f419c6fb0f35f30039a&oe=5A8BE786">
        <br> Goh Nanthawad Promsorn</p>
    </div>
    <div class="column">
      <hr>
      <br><br><br>
      อันนี้มันต้องอยู่ทางขวาาาาาสิว้ะ<br>
        <p> SCORE : ??? </p>
    </div>
    <div class="column">
  
    </div>
  </div>
</div>
  </template>

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
