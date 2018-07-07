import API from '../http-common'

const perfil = {}

perfil.load = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/usuario/info/', config)
  .then(response => {
    return response.data;
  });
}

perfil.load_materias = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/usuario/materia/', config)
  .then(response => {
    return response.data;
  });
}

export default perfil
