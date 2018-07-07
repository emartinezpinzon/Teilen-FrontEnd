import API from '../http-common'

const persona = {}

persona.mis_datos = function(){

}

persona.mis_materias = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/usuario/materia/',config).then(
    response =>{
      return response.data
    }
  )
}

persona.mis_proyectos = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/usuario/proyecto/', config).then(
    response =>{
      console.log("Persona mis proyectos--------------------")
      console.log(response.data)

      return response.data
    }
  )
}

persona.mis_proyectos_docente = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/usuario/proyecto/docente/', config).then(
    response =>{
      console.log("Persona mis proyectos--------------------")
      console.log(response.data)

      return response.data
    }
  )
}

export default persona
