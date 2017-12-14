<template>
  <div>
    <section class="hero is-warning is-medium">
  <div class="hero-body">
    <center><img src="<a href="target="_blank"<img border="0" src="http://image.free.in.th/v/2013/ie/171125123203.png" alt="images by free.in.th" width="450px" height="450px"/></center>
    <center><img style="margin-top:-6px"src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview-1.png"   width="50px" height="50px"><a class="button is-info" @click="login()">login with facebook</a>
    <a class="button is-info" @click="logout()">logout</a>
    </center>
  </div>
</section>

</div>
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

<style scoped>
.login--container {
  float: left;
  width: 100%;
  background-color: #fff;
}
</style>