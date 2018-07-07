<template>
  <div class="login-box">

    <nuxt/>

  </div>
</template>

<script>
export default {
  head: {
    script: [
      { src: '/bower_components/jquery/dist/jquery.min.js' },
      { src: '/bower_components/bootstrap/dist/js/bootstrap.min.js' },
      { src: '/dist/js/adminlte.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/js/uikit.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/js/uikit-icons.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: '/bower_components/bootstrap/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/bower_components/font-awesome/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: '/bower_components/Ionicons/css/ionicons.min.css' },
      { rel: 'stylesheet', href: '/dist/css/AdminLTE.min.css' },
      { rel: 'stylesheet', href: '/dist/css/login.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/css/uikit.min.css' }
    ],
    bodyAttrs: {
      class: 'hold-transition login-page'
    }
  }
}
</script>
