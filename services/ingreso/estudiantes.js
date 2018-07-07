import API from '../http-common'

const sesion = {}

sesion.ingresar = function(codigo, documento, password) {
  return API.post('/usuario/sesion/', {
    'code': codigo,
    'doc': documento,
    'pass': password
  })
  .then(response => {
    return response.data;
  });
}

export default sesion
