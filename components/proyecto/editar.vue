<template>
		<div>
<no-ssr placeholder="Loading...">
      <section class="content-header">
        <h1>
          Edición de proyectos
          <small>Edita tu proyecto</small>
        </h1>
      </section>
      </no-ssr>
            <no-ssr placeholder="Loading...">
      <section class="content container-fluid">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Datos del Proyecto</h3>
          </div>
          <div class="box-body">

              <div class="form-group">
                <label>Título</label>
                <input type="text" class="form-control" placeholder="Título" v-model="proyectoProfile.nombre">
              </div>
              <div >
                <label>Idea</label> <small> Opcional</small>
                <select class="form-control" v-model="proyecto.idea">
                  <option v-for="idea in ideas"
                  v-bind:value="proyecto.idea"
                  :selected="key == ideaproyecto.id"
                  :key="idea.id">{{idea.nombre}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Materia o materias del proyecto</label>
                <autocomplete
                  :source="mismaterias" input-class="form-control"
                  :results-display="formatomateria"
                  placeholder="Escoge materia"
                  @selected="addmateria">
                </autocomplete>

                <br>

                <span class="label label-primary" v-for="mate in materiasproyecto" :key="mate.nombre">{{mate.materia.nombre}} </span>
              </div>
              <div class="form-group">
                <label>Estudiantes</label> <small> Opcional</small>
                <autocomplete
                  :source="estudiantes" input-class="form-control"
                  :results-display="formattedDisplay"
                  placeholder="Escoge un estudiante"
                  @selected="addDistributionGroup">
                </autocomplete>

                <br>

                <span class="label label-primary" v-for="es in estudiantesProyecto" :key="es.is">  {{es.alumno.persona.email_institucional}} </span>
              </div>
              <div class="form-group" >
                <h4>Conecta con GitHub</h4>
                <a href="https://github.com/login/oauth/authorize?client_id=1a9db4bc7d429c820f19"><img src="https://image.flaticon.com/icons/svg/25/25231.svg"
 alt="" height="70" width="70" class="btn btn-lg btn-default"></a>
              </div>
              <div class="form-group" >
                <h4>Repositorios del proyecto</h4>
                  <div v-if="proyecto.repos != undefined">
                    <div class="col-md-6" v-for="repo in repositoriosProyecto" :key="repo.pk">
                      <a :href="repo.link">{{repo.nombre}}</a>
                    </div>
                    <div class="col-md-6" v-for="repo in proyecto.repos" :key="repo.pk">
                      <a :href="repo.html_url">{{repo.full_name}}</a>
                    </div>
                  </div>
              </div>
              <br>
              <br>
              <div class="form-group" >
                <h4>Mis Repositorios</h4>
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="repo in repos" :key="repo.id">
                  <button class="btn btn-success" v-on:click="agregarRepo(repo)">{{repo.name}}</button>
                </div>
              </div>
              <div class="box-footer text-right">
                <button  class="btn btn-primary" v-on:click="actualizarproyecto()">Guardar</button>
              </div>
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
import github from '~/services/github/github.js'
import Autocomplete from 'vuejs-auto-complete'
import NoSSR from 'vue-no-ssr'


export default {

 components:{
Autocomplete:Autocomplete,
'no-ssr': NoSSR
 },

data (){
  return {
  ideas :[],
 proyecto :{estudiantes:[], idea:{}, materias:[],repos:[], id:0, nombre:''},
 estudiantes:[],
 estu:{codigo:''},
 mismaterias:[],
 codegithub:true,
 repos:[],
 token_github:'',
 estudiantesProyecto:[],
 materiasproyecto:[],
 ideaProyecto:{},
 proyectoProfile:{},
 ideaproyecto:{},
 repositoriosProyecto:[]

  }
},



methods :{





    loguinGithub(){
      var token = localStorage.getItem("token")

      console.log("Code de github")
      console.log(this.$route.query.code);
      console.log("Code de github")

      console.log("Las siguientes impresiones son 'Ivan Duque'")

      if(this.$route.query.code){

        console.log("Ivan")

        github.crear_token(this.$route.query.code,token).then(
          response=>{
            this.repos= response.data
          }
        )

        console.log("Duque")

       } else {
         console.log("Nanay")
       }
    },

    cargarRepos(){
      const token = localStorage.getItem("token")

      github.listar_repositorio(token).then(
        response=>{
          this.repos = response.data
          console.log(response.data)
        }
      )
    },

cargarIdeas(){
      ideas.read_all(localStorage.getItem("token")).then(response =>{
        this.ideas = response
      },
      response =>{
        console.log('Error')
      })
    },

  cagarmismaterias (){
    const token  = localStorage.getItem("token")
persona.mis_materias(token).then(response=>{
  this.mismaterias = response
  console.log(this.mismaterias)
})

  },

  cargarEstudiantes(){
    const token  = localStorage.getItem("token")
    estudiante.read(token).then(
      response =>{
        this.estudiantes = response

    },
    response =>{
      console.log('error')

    })
  },

  cargarProyecto(){
      const token  = localStorage.getItem("token")
proyecto.read_a(token,this.$route.params.id,token).then(response=>{
    this.proyectoProfile = response

})

  },

  cargarEstudianteProyecto(){
    const token  = localStorage.getItem("token")
proyecto.read_estudiante(token,this.$route.params.id).then(response=>{
this.estudiantesProyecto = response
})
  },

  cargarMateriaProyecto(){
    const token  = localStorage.getItem("token")
      self = this


      proyecto.read_materia(token,this.$route.params.id).then(response=>{
this.materiasproyecto = response
console.log('materias')
console.log(response)

})

  },

  cargarIdeaProyecto(){
    const token  = localStorage.getItem("token")
      proyecto.read_idea(token,this.$route.params.id).then(response=>{
this.ideaproyecto = response.idea
console.log(response)

},
response=>{
  console.log('idea no cargo')

})

  },

  cargarReposProyecto(){
    const token  = localStorage.getItem("token")


proyecto.read_repos(token, this.$route.params.id).then(
  response=>{
    this.repositoriosProyecto = response

  }
)
  },
  RegistrarProyecto(){
    console.log(this.proyecto)
    proyecto.create(this.proyecto).then(
      response =>{

        UIkit.notification('Proyecto Registrado :)')
        this.proyecto = {estudiantes:[], idea:{}}
      },
      response =>{
        UIkit.notification('Ups ha ocurrido un problema :(, recuerda llenar los datos obligatorios')

      }
    )
  },

  actualizarproyecto (){
    const token  = localStorage.getItem("token")
    console.log(this.proyectoProfile)
    this.proyecto.estudiantes = this.estudiantesProyecto
    this.proyecto.materias = this.materiasproyecto
    this.proyecto.id = this.proyectoProfile.id
    this.proyecto.nombre = this.proyectoProfile.nombre


    proyecto.update(token,this.proyecto).then(response=>{
      UIkit.notification('se ha actualizado con exito')
    })

  },

  agregarRepo (proyecto){
this.proyecto.repos.push(proyecto)
  },
 formattedDisplay(result) {
      return result.codigo + ' - '  + result.persona.first_name + ' - '+ result.persona.email_institucional
    },
  addDistributionGroup(group){
    this.estudiantesProyecto.push(group.selectedObject)
  },
  formatomateria(result){
    return result.materia.codigo + ' - ' + result.materia.nombre

  },

  addmateria(group){
    console.log(group.selectedObject.materia)
    this.materiasproyecto.push(group.selectedObject)

  }

},
mounted (){


  this.cargarIdeas()
  this.cargarEstudiantes()
  this.cagarmismaterias()
  this.loguinGithub()

  this.cargarProyecto()
  this.cargarMateriaProyecto()
  this.cargarEstudianteProyecto()

  this.cargarIdeaProyecto()
  this.cargarRepos()
  this.cargarReposProyecto()


}

}
</script>


<style>

</style>
