<template>
  <div>
    <section class="content-header">
      <h1>
        Mis ideas <small>Consulta tus ideas y problemáticas guardadas</small>
      </h1>
    </section>
    <section class="content">

      <div class="form-group">
        <label><i class="fa fa-search"></i> Buscar</label>
        <input type="text" class="form-control" v-model="busqueda" placeholder="La busqueda es sensible a mayúsculas y minúsculas">
      </div>

      <div class="box box-primary" v-for="idea in ideasFiltradas" :key="idea.id">
        <div class="box-header with-border">
          <i class="fa fa-lightbulb-o"></i>
          <h2 class="box-title">{{ idea.nombre }}</h2>
          <div class="box-tools pull-right">
            <small class="hidden-xs"><p class="filter"><i class="fa fa-clock-o"></i> {{ idea.fecha_creacion | moment }}</p></small>
          </div>
        </div>
        <div class="box-body">
          <small class="visible-xs-12 hidden-lg hidden-md hidden-sm"><p class="filter"><i class="fa fa-clock-o"></i> {{ idea.fecha_creacion | moment }}</p></small>
          <span>{{ idea.descripcion }}</span>
        </div>
        <div class="box-footer">
          <div class="clearfix text-right">
            <a class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editar" v-on:click="edit(idea)"><i class="fa fa-pencil"></i> Editar</a>
          </div>
        </div>
      </div>

      <div class="modal fade" id="editar" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></a>
            <h4 class="modal-title">
              Taller de edición de ideas
            </h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" v-model="idea.nombre">
              </div>
              <div class="form-group">
                <label>Descripción</label>
                <textarea class="form-control" rows="10" v-model="idea.descripcion"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <a class="btn btn-danger pull-left" data-toggle="modal" data-target="#eliminar"><i class="fa fa-trash"></i> Eliminar idea</a>
              <a class="btn btn-success" data-dismiss="modal" aria-label="Close" v-on:click="update()"><i class="fa fa-pencil"></i> Actualizar idea</a>
            </div>
          </div>
        </div>
      </div>

      <div class="modal modal-danger fade" id="eliminar" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></a>
            <h4 class="modal-title">
              Confirmación de eliminación
            </h4>
            </div>
            <div class="modal-body">
              <p>¿Realmente desea eliminar esta idea?</p>
            </div>
            <div class="modal-footer">
              <a class="btn btn-outline" data-toggle="modal" data-target="#eliminar">No, cancelar</a>
              <a class="btn btn-outline" data-dismiss="modal" aria-label="Close" v-on:click="remove()">Si, eliminar idea</a>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import ideas from '~/services/ideas/ideas.js'
import moment from 'moment'

export default {
  data() {
    return {
      ideas: [],
      index: 0,
      idea:{},
      busqueda: ''
    }
  },

  methods: {
    edit(idea) {
      this.idea=idea
    },

    update() {
      ideas.update(localStorage.getItem("token"), this.idea).then(
        response =>{
          UIkit.notification({
            message: "<span uk-icon='icon: check'></span> Idea actualizada",
            status: 'success',
            pos: 'top-center',
            timeout: 5000
          });

          ideas.read_a(localStorage.getItem("token"), localStorage.getItem("codigo")).then(
            response =>{
              this.ideas = response;
            },
            response =>{
              console.log('Fallo...')
            }
          )
        },
        response =>{

        }
      )
    },

    remove() {
      ideas.delete(localStorage.getItem("token"), this.idea).then(
        response =>{
          $('#editar').modal('hide')

          UIkit.notification({
            message: "<span uk-icon='icon: check'></span> Idea eliminada",
            status: 'success',
            pos: 'top-center',
            timeout: 5000
          });

          ideas.read_a(localStorage.getItem("token"), localStorage.getItem("codigo")).then(
            response =>{
              this.ideas = response;
            },
            response =>{
              console.log('Fallo...')
            }
          )
        },
        response =>{
          UIkit.notification({
            message: "<span uk-icon='icon: warning'></span> No puede eliminar la idea porque ya pertenece a un proyecto",
            status: 'danger',
            pos: 'top-center',
            timeout: 5000
          });
        }
      )
    }
  },

  mounted() {
    read :{
      ideas.read_a(localStorage.getItem("token"), localStorage.getItem("codigo")).then(
        response =>{
          this.ideas = response;
        },
        response =>{
          console.log('Fallo...')
        }
      )
    }
  },

  computed: {
    ideasFiltradas: function() {
      return this.ideas.filter((idea) => {
        return (idea.nombre.match(this.busqueda) || idea.descripcion.match(this.busqueda));
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
textarea {
    resize: none;
}

.uk-notification {
  z-index: 5000;
}

.box-header > .box-tools {
    top: 13px;
}
</style>
