<template>

<div class="wrapper">
  <header class="main-header">
    <a href="/perfil/" class="logo">
      <span class="logo-mini"><b>T</b>LN</span>
      <span class="logo-lg"><b>Tei</b>Len</span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li>
            <a v-on:click="salir()">
              <i class="fa fa-power-off"></i>
            </a>
          </li>
         </ul>
      </div>
    </nav>
  </header>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img :src="imagen" class="img-circle">
        </div>
        <div class="pull-left info">
          <p>{{ nombre }}</p>
        </div>
      </div>
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MENÚ PRINCIPAL</li>

        <li class="treeview">
          <a><i class="fa fa-user"></i> <span><strong>Información estudiantil</strong></span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/perfil/">Mi perfil</a></li>
            <li><a href="/perfil/materias/">Mis materias</a></li>
          </ul>
        </li>

        <li class="treeview">
          <a><i class="fa fa-lightbulb-o"></i> <span><strong>Ideas y problemáticas</strong></span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/ideas/crear/">Crear idea</a></li>
            <li><a href="/ideas/">Mis ideas</a></li>
            <li><a href="/ideas/descubrir/">Descubre ideas</a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#"><i class="fa fa-laptop"></i> <span><strong>Proyectos e innovación</strong></span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="rol === 'DOCENTE'"><a href="/proyectos/crear/">Crear Proyecto</a></li>
            <li v-if="rol === 'DOCENTE'"><a href="/proyectos/docente/">Mis proyectos</a></li>
            <li v-else-if="rol === 'ESTUDIANTE'"><a href="/proyectos/estudiante/">Mis proyectos</a></li>
            <li><a href="/proyectos/descubrir/">Descubre proyectos</a></li>
          </ul>
        </li>

      </ul>
    </section>
  </aside>
  <div class="content-wrapper">

  <nuxt/>

  </div>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      Proyecto BBDD-PW
    </div>
    <strong>Copyright &copy; 2018 <a href="https://ww2.ufps.edu.co">Universidad Francisco de Paula Santander</a></strong>
  </footer>
  <div class="control-sidebar-bg"></div>
</div>


</template>

<script>
import sesion from '~/services/ingreso/estudiantes.js'

export default {
  head: {
  script: [
    { src: '/bower_components/jquery/dist/jquery.min.js' },
    { src: '/bower_components/bootstrap/dist/js/bootstrap.min.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/js/uikit.min.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/js/uikit-icons.min.js' },
    { src: '/dist/js/adminlte.min.js' }
  ],
  link: [
      { rel: 'stylesheet', href: '/bower_components/bootstrap/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/bower_components/font-awesome/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: '/bower_components/Ionicons/css/ionicons.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/css/uikit.min.css' },
      { rel: 'stylesheet', href: '/dist/css/AdminLTE.min.css' },
      { rel: 'stylesheet', href: '/dist/css/skins/skin-blue-light.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic' }

    ],
    bodyAttrs: {
      class: 'hold-transition skin-blue-light sidebar-mini'
    }
  },

  data() {
    return {
      nombre: '',
      imagen: '',
      rol: ''
    }
  },

  mounted() {
    read :{
      if (localStorage.length === 0) {
        this.$router.push("/ingreso/estudiante/")
      } else {
        this.nombre = localStorage.getItem("nombre")
        this.imagen = localStorage.getItem("imagen")
        this.rol = localStorage.getItem("rol")
      }
    }
  },

  methods: {
    salir() {
      localStorage.clear()

      this.$router.push("/ingreso/estudiante/")
    }
  }


}
</script>

<style>
a {
  text-decoration: none !important;
}

b, strong {
    font-weight: 700 !important;
}

.skin-blue-light .main-header .logo:hover {
    background-color: #357ca5;
}
</style>
