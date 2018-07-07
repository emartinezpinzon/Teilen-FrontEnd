<template>
  <div>
    <section class="content">
      <div v-if="error.statusCode === 404" class="error-page">
        <h2 class="headline text-red">404</h2>
        <div class="error-content">
          <h3><i class="fa fa-warning text-red"></i> No era necesario que vinieras</h3>
          <p>A mi gato no le gustan las visitas, no tenías que ponerte a jugar con la dirección...</p>
          <a href="/perfil/">¡Vuelve a casa!</a>
        </div>
      </div>
      <div v-else>
        <a href="/perfil/">¿Quieres volver a casa?</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'grumpy'
}
</script>

<style>
.content {
  margin-top: 75px;
}
</style>
