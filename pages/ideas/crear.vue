<template>
  <div>
     <no-ssr placeholder="Loading...">
    <section class="content-header">
      <h1>
        Registra una idea
        <small>Guarda tus ideas</small>
      </h1>
    </section>
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <form role="form">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" class="form-control" v-model="nombre">
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea class="form-control" rows="10" v-model="descripcion"></textarea>
            </div>
            <div class="box-footer text-right">
              <a class="btn btn-primary btn-lg" v-on:click="create()">Guardar</a>
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
 import NoSSR from 'vue-no-ssr'


export default {
  components: {
      'no-ssr': NoSSR
    },
  data () {
    return {
      nombre: '',
      descripcion: ''
    }
  },

  methods: {
    create() {
      let self = this
      if (self.nombre ==="" || self.descripcion === ""){
        UIkit.notification({
          message: "<span uk-icon='icon: warning'></span> Ingrese todos los datos",
          status: 'warning',
          pos: 'top-center',
          timeout: 5000
        });
      } else {
        ideas.create(localStorage.getItem("token"), self.nombre, self.descripcion).then(
          response =>{
            self.nombre = "";
            self.descripcion = "";

            UIkit.notification({
              message: "<span uk-icon='icon: check'></span> Idea registrada",
              status: 'success',
              pos: 'top-center',
              timeout: 5000
            });
          },
          response =>{
            UIkit.notification({
              message: "<span uk-icon='icon: warning'></span> No se ha podido conectar",
              status: 'warning',
              pos: 'bottom-center',
              timeout: 5000
            });
          }
        )
      }
    }
  }
}
</script>

<style>
textarea {
    resize: none;
}
</style>
