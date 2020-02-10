<template>
  <nav class="navbar teal">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo center"><i class="material-icons">cloud</i>:codica</router-link>
    </div>
  </nav>
</template>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
.navbar{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:64px!important;
  padding:0 2rem;
  z-index:1000
}
.nav-wrapper{
  -webkit-justify-content:space-between;
  -ms-flex-pack:justify;
  justify-content:space-between
}
</style>