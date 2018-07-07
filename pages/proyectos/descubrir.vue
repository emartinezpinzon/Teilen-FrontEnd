<template>
  <div>
    <section class="content-header">
      <h1>
        Descubre proyectos
        <small>Navega entre todos los proyectos en Teilen</small>
      </h1>
    </section>
    <section class="content">

      <div class="form-group">
        <label><i class="fa fa-search"></i> Buscar por nombre</label>
        <input type="text" class="form-control" v-model="busqueda" placeholder="La busqueda es sensible a mayúsculas y minúsculas">
      </div>

      <div class="box box-default"  v-for="proyect in proyectosFiltrados" :key="proyect.id">
        <div class="box-header with-border">
          <i class="fa fa-laptop"></i>
          <h2 class="box-title" ><a v-bind:href="'/proyectos/'+proyect.id ">{{ proyect.nombre }}</a></h2>
          <div class="box-tools pull-right">
            <small class="hidden-xs"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyect.fecha_creacion | moment }}</p></small>
          </div>
        </div>
        <div class="box-body">
          <small class="visible-xs-12 hidden-lg hidden-md hidden-sm"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyect.fecha_creacion | moment }}</p></small>
          <span>{{ proyect.descripcion }}</span>
        </div>
        <div class="box-footer">
          <img :src="proyect.docente.persona.imagen" alt="Imagen de perfil" class="author-img"><span>{{ proyect.docente.persona.first_name }} {{ proyect.docente.persona.last_name }}</span>
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
      proyectos: [],
      mostrar: false,
      busqueda: ''
    }
  },

  methods :{
    cargarProyectos(){
      proyecto.read(localStorage.getItem("token")).then(
        response=>{
          this.proyectos = response
        }
      )
    },

    loguear(){
      console.log("ingreso github")
      github.login().then(
        response=>{
          console.log(response)
        }
      )
    }

    
  },

  mounted(){
    this.cargarProyectos()
    
  },

  computed: {
    proyectosFiltrados: function() {
      return this.proyectos.filter((proyecto) => {
        return (proyecto.nombre.match(this.busqueda));
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

.author-img {
    border-radius: 50%;
    float: left;
    width: 20px;
    height: 20px;

    margin-right: 5px;
}
</style>

