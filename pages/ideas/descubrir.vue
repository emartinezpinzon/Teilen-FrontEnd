<template>
  <div>
    <section class="content-header">
      <h1>
        Descubre nuevas ideas <small>Consulta las ideas de tus compañeros</small>
      </h1>
    </section>
    <section class="content">


      <div class="form-group">
        <label><i class="fa fa-search"></i> Buscar</label>
        <input type="text" class="form-control" v-model="busqueda" placeholder="La busqueda es sensible a mayúsculas y minúsculas">
      </div>

      <div class="box box-default" v-for="idea in ideasFiltradas" :key="idea.id">
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
          <img :src="idea.persona.persona.imagen" alt="Imagen de perfil" class="author-img"><span>{{ idea.persona.persona.first_name }} {{ idea.persona.persona.last_name }}</span>
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
      busqueda: ''
    }
  },

  mounted() {
    read :{
      ideas.read(localStorage.getItem("token")).then(
        response =>{
          this.ideas = response;
        },
        response =>{
          console.log('Fallo')
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
