<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-teal-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.app-loader {
  padding-top:64px;
  display: flex;
  justify-content: center;
}
</style>