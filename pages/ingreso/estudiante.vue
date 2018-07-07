<template>
<div>
  <div class="login-box-body">
    <div class="login-logo">
      <b>Tei</b>Len <small>Estudiantes</small>
    </div>

    <form action="Vista Usuarios/DatosPersonales.html" method="post">
      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="Código" v-model="code">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Documento" v-model="doc">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Contraseña" v-model="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <br>
      <div class="row">
        <div class="col-xs-12 center-block">
          <a v-on:click="login()" class="btn btn-primary btn-block btn-flat">Iniciar Sesión</a>
        </div>
      </div>
    </form>
    <div class="row login-links">
      <div class="col-xs-12">
        <a href="/ingreso/docente/" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Docente">
          <div class="text-center">
            <span class="text-primary">¿Eres docente? Ingresa a tu plataforma aquí</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import sesion from '~/services/ingreso/estudiantes.js'

export default {
  layout: 'login',

  data () {
    return {
      code: '',
      doc: '',
      password: ''
    }
  },

  methods: {
    login() {
      let self = this
      if (self.code === "" || self.doc === "" || self.password === "") {
        UIkit.notification({
          message: "<span uk-icon='icon: warning'></span> Ingrese todos los datos",
          status: 'warning',
          pos: 'top-center',
          timeout: 5000
        });
      } else {
        sesion.ingresar(this.code, this.doc, this.password).then(
          response =>{
            localStorage.setItem("codigo", response.codigo)
            localStorage.setItem("nombre", response.nombre)
            localStorage.setItem("apellido", response.apellido)
            localStorage.setItem("rol", response.rol)
            localStorage.setItem("imagen", response.imagen)
            localStorage.setItem("token", response.token)

            window.location.href = '/perfil/';
          },
          response =>{
            UIkit.notification({
              message: "<span uk-icon='icon: warning'></span> Datos incorrectos",
              status: 'warning',
              pos: 'top-center',
              timeout: 5000
            });
          }
        )
      }
    }
  }
}
</script>

