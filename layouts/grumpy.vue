<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  head: {
    script: [
      { src: '/bower_components/jquery/dist/jquery.min.js' },
      { src: '/bower_components/bootstrap/dist/js/bootstrap.min.js' },
      { src: '/dist/js/adminlte.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: '/bower_components/bootstrap/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/bower_components/font-awesome/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: '/dist/css/AdminLTE.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic' }
    ],
    bodyAttrs: {
      class: 'hold-transition login-page'
    }
  }
}
</script>

<style>
body {
    background-image: url('https://i.imgur.com/5nj27qU.png') !important;
    background-position: 50% !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    height: 100% !important;
}
</style>
