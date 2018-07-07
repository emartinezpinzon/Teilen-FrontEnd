<template>
	<div>
    <section class="content-header">
      <h1>
        Registra un proyecto
        <small>Crea los proyectos de tus cursos</small>
      </h1>
    </section>

    <no-ssr placeholder="Loading...">
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Datos del Proyecto</h3>
        </div>
        <div class="box-body">
          <form role="form">
            <div class="form-group">
              <label>Título</label>
              <input type="text" class="form-control" placeholder="Título" v-model="proyecto.titulo">
            </div>
            <div class="form-group">
              <label>Idea</label> <small> Opcional</small>
              <select class="form-control" v-model="proyecto.idea">
                <option v-for="idea in ideas" v-bind:value="idea" :key="idea.id"> {{ idea.nombre }} - {{ idea.persona.persona.first_name }} {{ idea.persona.persona.last_name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Materia o materias del proyecto</label>
              <autocomplete
                :source="my_materias" input-class="form-control"
                :results-display="formatomateria"
                placeholder="Selecciona una materia"
                @selected="addmateria">
              </autocomplete>
              <span class="label label-primary" v-for="es in proyecto.materias" :key="es"> {{ es.codigo }} : {{ es.nombre }} </span>
            </div>
            <div class="form-group">
              <label>Estudiantes</label> <small> Opcional</small>
              
              <autocomplete
                :source="estudiantes" input-class="form-control"
                :results-display="formattedDisplay"
                placeholder="Selecciona los estudiantes"
                @selected="addDistributionGroup">
              </autocomplete>
              <span class="label label-primary" v-for="es in proyecto.estudiantes" :key="es.codigo">{{ es.codigo }} - {{ es.persona.email_institucional }} </span>
            </div>
            <div class="box-footer text-right">
              <a href="#" class="btn btn-primary" v-on:click="RegistrarProyecto()">Guardar</a>
            </div>
          </form>
        </div>
      </div>
    </section>
    </no-ssr>
  </div>
</template>

<script>

import ideas from '~/services/ideas/ideas.js'
import estudiante from '~/services/estudiante/estudiante.js'
import proyecto from '~/services/proyecto/proyecto.js'
import persona from '~/services/persona/persona.js'
import Autocomplete from 'vuejs-auto-complete'
import perfil from '~/services/perfil/perfil.js'
 import NoSSR from 'vue-no-ssr'

export default {
  
  components:{
    Autocomplete:Autocomplete,
    'no-ssr': NoSSR
  },

  data (){
    return {
      ideas: [],
      proyecto: {
        estudiantes: [],
        idea: {},
        materias: []
      },
      estudiantes: [],
      estu: {
        codigo: ''
      },
      my_materias: []
    }
  },

  methods :{
    cargarIdeas(){
      ideas.read_all(localStorage.getItem("token")).then(response =>{
        this.ideas = response
      },
      response =>{
        console.log('Error')
      })
    },

    cagarmismaterias (){
      perfil.load_materias(localStorage.getItem("token")).then(
        response=>{
          this.my_materias = response
          console.log("Mis materias")
          console.log(this.my_materias)
        }
      )
    },

    cargarEstudiantes(){
      estudiante.read(localStorage.getItem("token")).then(
        response =>{
          this.estudiantes = response
          console.log("Estudiantes")
          console.log(this.estudiantes)
        },
        response =>{
          console.log('error')
        }
      )
    },

    RegistrarProyecto(){
      console.log(this.proyecto)
      proyecto.create(localStorage.getItem("token"),this.proyecto).then(
        response =>{
          UIkit.notification('Proyecto Registrado :)')
          this.proyecto = {estudiantes:[], idea:{}}
        },
        response =>{
          UIkit.notification('Ups ha ocurrido un problema :(, recuerda llenar los datos obligatorios')
        }
      )
    },

    formattedDisplay(result) {
      return result.codigo + ' - '  + result.persona.first_name + ' - '+ result.persona.email_institucional
    },

    addDistributionGroup(group){
      this.proyecto.estudiantes.push(group.selectedObject)
    },

    formatomateria(result){
      return result.materia.codigo + ' - ' + result.materia.nombre
    },

    addmateria(group){
      this.proyecto.materias.push(group.selectedObject.materia)
    }
  },

  mounted (){
    if (localStorage.getItem("rol") === "DOCENTE") {
      this.cargarIdeas()
      this.cargarEstudiantes()
      this.cagarmismaterias()
    } else {
      window.location.href = '/proyectos/';
    }
  }
}
</script>
