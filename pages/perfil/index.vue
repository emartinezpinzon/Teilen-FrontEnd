<template>
  <div>
    <section class="content-header">
      <h1>
        Información estudiantil <small>Consulta tu información personal</small>
      </h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-user"></i>
          <h2 class="box-title">Datos personales</h2>
        </div>
        <div class="box-body no-padding clearfix">
          <div class="col-md-3">
            <div class="text-center margin">
              <img :src="imagen" alt="Imagen de la persona" class="user-image img-sqare img-thumbnail" style="max-width: 200px; max-height: 200px;">
            </div>
          </div>
          <div class="col-md-9">
            <div class="table-responsive">
              <table class="table table-hover table-striped table-condensed table-bordered">
              <tbody>
                <tr>
                  <th>Código</th>
                  <td>{{ perfil.codigo }}</td>
                </tr>
                <tr>
                  <th>Nombres</th>
                  <td>{{ persona.first_name }}</td>
                </tr>
                <tr>
                  <th>Apellidos</th>
                  <td>{{ persona.last_name }}</td>
                </tr>
                <tr>
                  <th>Celular</th>
                  <td>{{ persona.telefono }}</td>
                </tr>
                <tr>
                  <th>Correo</th>
                  <td>{{ persona.email }}</td>
                </tr>
                <tr>
                  <th>Correo Institucional</th>
                  <td>{{ persona.email_institucional }}</td>
                </tr>
                <tr>
                 <th>Carrera</th>
                  <td>{{ perfil.carrera }}</td>
                </tr>
                <tr>
                  <th>Rol</th>
                  <td>{{ rol.nombre }}</td>
                </tr>

              </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="box-footer no-padding">
          <div class="clearfix text-center">
            <span><strong>Nota:</strong> La actualización de datos se hace directamente desde <a href="https://divisist2.ufps.edu.co" target="_blank">Divisist</a></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import perfil from '~/services/perfil/perfil.js'

export default {
  data() {
    return {
      perfil: {},
      persona: {},
      rol: {},
      imagen: ''
    }
  },

  mounted() {
    let self = this

    perfil :{
      perfil.load(localStorage.getItem("token")).then(
        response =>{
          this.perfil = response;
          this.persona = this.perfil["persona"]
          this.rol = this.perfil["rol"]
          this.imagen = this.persona["imagen"]
        },
        response =>{
          console.log('Fallo')
        }
      )
    }
  }
}

</script>

<style>

</style>
