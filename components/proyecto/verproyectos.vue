<template>
      <div>
    <section class="content-header">
      <h1>
        Ver proyectos
      </h1>
    </section>
    <section class="content">

      <div class="form-group">
        <label><i class="fa fa-search"></i> Buscar</label>
        <input type="text" class="form-control" v-model="busqueda">
      </div>

      <div class="box box-default"  v-for="proyect in proyectosfiltrados" :key="proyect.id">
        <div class="box-header with-border">
          <i class="fa fa-lightbulb-o"></i>
          <h2 class="box-title" ><a v-bind:href="'/proyectos/editar/'+proyect.proyecto.id ">{{ proyect.proyecto.nombre }}</a></h2>
          <div class="box-tools pull-right">
            <small class="hidden-xs"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyect.fecha_creacion | moment }}</p></small>
          </div>
        </div>
        <div class="box-body">
          <small class="visible-xs-12 hidden-lg hidden-md hidden-sm"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyect.fecha_creacion | moment }}</p></small>
          <span>{{ proyect.descripcion }}</span>
        </div>
        <div class="box-body">

        </div>
        <div class="box-footer">
          <img :src="proyect.persona.imagen" alt="Imagen de perfil" class="author-img"><span>{{ proyect.persona.persona.first_name }} {{ proyect.persona.persona.last_name }}</span>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import proyecto from '~/services/proyecto/proyecto.js'
import persona from '~/services/persona/persona.js'

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
            })
        },
        

        buscar(event){
            this.mostrar = true
            console.log(event)

            if(event.keyCode==8){
                if (this.busqueda.length==0){
                    this.mostrar = false
                }
            }

            }
    },

    mounted(){
        this.cargarProyectos()
      

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

.author-img {
    border-radius: 50%;
    float: left;
    width: 20px;
    height: 20px;

    margin-right: 5px;
}
</style>
