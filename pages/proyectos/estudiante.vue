<template>
  <div>
    <section class="content-header">
      <h1>
        Mis proyectos
        <small>Navega entre tus proyectos</small>
      </h1>
    </section>
    <section class="content">

      <div class="form-group">
        <label><i class="fa fa-search"></i> Buscar por nombre</label>
        <input type="text" class="form-control" v-model="busqueda" placeholder="La busqueda es sensible a mayúsculas y minúsculas">
      </div>

      <div class="box box-default"  v-for="proyect in proyectosfiltrados" :key="proyect.id">
        <div class="box-header with-border">
          <i class="fa fa-laptop"></i>
          <h2 class="box-title" >{{ proyect.proyecto.nombre }}</h2>
          <div class="box-tools pull-right">
            <small class="hidden-xs"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyect.fecha_creacion | moment }}</p></small>
          </div>
        </div>
        <div class="box-body">
          <small class="visible-xs-12 hidden-lg hidden-md hidden-sm"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyect.fecha_creacion | moment }}</p></small>
          <span>{{ proyect.descripcion }}</span>
        </div>
        <div class="box-footer">
          <div class="clearfix text-right">
            <a class="btn btn-warning btn-sm" :href="'/proyectos/editar/'+proyect.proyecto.id+'/'"><i class="fa fa-pencil"></i> Editar</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import proyecto from '~/services/proyecto/proyecto.js'
import persona from '~/services/persona/persona.js'
import github from '~/services/github/github.js'
import moment from 'moment'

export default {
  data (){
    return{
      proyectos : [],
      mostrar: false,
      busqueda :''
    }
  },

  methods :{
    cargarProyectos(){
      persona.mis_proyectos(localStorage.getItem("token")).then(
        response=>{
          this.proyectos = response

          console.log("Proyectos---------------------------------------------")
          console.log(this.proyectos)
        }
      )
    }
  },

  mounted(){
    if (localStorage.getItem("rol") === "ESTUDIANTE") {
      this.cargarProyectos()
    } else {
      window.location.href = '/proyectos/docente/';
    }
  },

  computed : {
    proyectosfiltrados: function() {
      return this.proyectos.filter((proyect) => {
        return (proyect.proyecto.nombre.match(this.busqueda));
      });
    }
  },

  filters: {
    moment: function (date) {
      moment.locale('es')
      return moment(date).format('[Creado el] dddd D [de] MMMM [del] YYYY [a las] h:mm a');
    }
  }

}
</script>

<style>
.box-header > .box-tools {
    top: 13px;
}
</style>

