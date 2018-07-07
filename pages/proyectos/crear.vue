<template>
  <div>
    <crear :proyecto="proyecto"></crear>
  </div>
</template>

<script>
import crear from '~/components/proyecto/crear.vue'
if (process.browser) {
  require('vuejs-auto-complete')
}
export default {
  components:{
    crear
  },

  data (){
    return {
      proyecto: {
        estudiantes: [],
        idea:{},
        materias:[],
        titulo:'xdxdxd'
      }
    }
  },

  propsData: {
    proyecto: {
      estudiantes: [],
      idea: {},
      materias: [],
      titulo:'xdxdxd'
    }
  },

  methods :{

  }
}
</script>
