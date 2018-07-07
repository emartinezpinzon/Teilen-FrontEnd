<template>
  <div>
    <section class="content-header">
      <h1>
        Información del proyecto
      </h1>
    </section>
    <section class="content container-fluid">
      <div class="box box-success">
        <div class="box-header with-border">
          <h3 class="box-title">{{ proyectoProfile.nombre }}</h3>
          <div class="box-tools pull-right">
            <small class="hidden-xs"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyectoProfile.fecha_creacion | moment }}</p></small>
          </div>
        </div>
        <div class="box-body">
          <small class="visible-xs-12 hidden-lg hidden-md hidden-sm"><p class="filter"><i class="fa fa-clock-o"></i> {{ proyectoProfile.fecha_creacion | moment }}</p></small>
          <form role="form">
            <div class="form-group">
              <label>Materias</label>

              <div v-for="materia in materias" :key="materia.id">
                <span class="label label-primary">
                  {{ materia.materia.codigo }} {{ materia.materia.nombre }}
                </span>
              </div>
            </div>
            <div>
              <label>Idea</label>

              <div v-for="idea in ideas" :key="idea.id">
                {{ idea.idea.nombre }} Creada por: {{ idea.idea.persona.persona.first_name }} {{ idea.idea.persona.persona.last_name }}
              </div>
            </div>
            <br>
            <div class="form-group">
              <label>Estudiantes</label>

              <div v-for="estudiante in estudiantes" :key="estudiante.id">
                <img :src="estudiante.alumno.persona.imagen" alt="Imagen de perfil" class="author-img">{{ estudiante.alumno.persona.first_name }} {{ estudiante.alumno.persona.last_name }}
              </div>
            </div>
            <div class="form-group">
              <label>Repositorios</label>

              <div v-for="repositorio in repositorios" :key="repositorio.id">
                <a class="btn btn-default" target="_blank" :href="repositorio.link">{{ repositorio.nombre }}</a>
              </div>
            </div>
          </form>
        </div>
        <div class="box-footer">
          <label>Profesor encargado</label>
          <br>
          <a :href="'mailto:'+personaDocente.email_institucional+'?Subject=Me llamó la atención '+proyectoProfile.nombre" target="_blank"><img :src="personaDocente.imagen" alt="Imagen de perfil" class="author-img">{{ personaDocente.first_name }} {{ personaDocente.last_name }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ideas from '~/services/ideas/ideas.js'
import estudiante from '~/services/estudiante/estudiante.js'
import proyecto from '~/services/proyecto/proyecto.js'
import docenteVue from './docente.vue'
import moment from 'moment'

export default {
  data (){
    return {
      proyectoProfile:{},
      docente: {},
      personaDocente: {},
      estudiantes: [],
      ideas: [],
      materias: [],
      repositorios: []
    }
  },
  mounted(){
    proyecto.read_a(localStorage.getItem("token"), this.$nuxt.$route.params.id).then(
      response=>{
        this.proyectoProfile = response
        this.docente = this.proyectoProfile.docente
        this.personaDocente = this.docente.persona
      },
      response=>{

      }
    ),

    proyecto.read_estudiante(localStorage.getItem("token"), this.$nuxt.$route.params.id).then(
      response=>{
        this.estudiantes = response
      },
      response=>{

      }
    ),

    proyecto.read_idea(localStorage.getItem("token"), this.$nuxt.$route.params.id).then(
      response=>{
        this.ideas = response
      },
      response=>{

      }
    ),

    proyecto.read_materia(localStorage.getItem("token"), this.$nuxt.$route.params.id).then(
      response=>{
        this.materias = response
      },
      response=>{

      }
    ),

    proyecto.read_repos(localStorage.getItem("token"), this.$nuxt.$route.params.id).then(
      response=>{
        this.repositorios = response
      },
      response=>{

      }
    )
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
