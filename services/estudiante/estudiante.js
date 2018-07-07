import API from '../http-common'

const estudiante = {}

estudiante.read = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get("/usuario/estudiante/", config).then(
    response =>{
      return response.data
    }
  )
}
export default estudiante
