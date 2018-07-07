<template>
  <div>
    <section class="content-header">
      <h1>
        Información de matricula <small>Consulta tus materias</small>
      </h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <i class="fa fa-user"></i>
          <h2 class="box-title">Historial de materias matriculadas</h2>
        </div>
        <div class="box-body clearfix">

            <div class="table-responsive">
              <table class="table table-hover table-striped table-condensed table-bordered">
              <tbody>
                <tr>
                  <th class="col-xs-2">Código</th>
                  <th class="col-xs-6">Nombre</th>
                  <th class="col-xs-2">Año</th>
                  <th class="col-xs-2">Semestre</th>
                </tr>
                <tr v-for="materia in materias" :key="materia.id">
                  <td> {{ materia.materia.codigo }} </td>
                  <td> {{ materia.materia.nombre }} </td>
                  <td> {{ materia.fecha_creacion | moment }} </td>
                  <td> {{ materia.semestre }} </td>
                </tr>

              </tbody>
              </table>
            </div>
        </div>
        <div class="box-footer no-padding">
          <div class="clearfix text-center">
            <span><strong>Nota:</strong> El historial de las materias sólo se almacena de los semestres en los que ha usado Teilen</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import perfil from '~/services/perfil/perfil.js'
import moment from 'moment'

export default {
  data() {
    return {
      materias: {}
    }
  },

  mounted() {
    let self = this

    perfil :{
      perfil.load_materias(localStorage.getItem("token")).then(
        response =>{
          this.materias = response;
        },
        response =>{
          console.log('Fallo')
        }
      )
    }
  },

  filters: {
    moment: function (date) {
      moment.locale('es')
      return moment(date).format('YYYY');
    }
  }
}

</script>

<style>

</style>
