import API from '../http-common'

const proyecto = {}

proyecto.read = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get("/proyecto/", config).then(
    response =>{
      return response.data
    }
  )
}

proyecto.create = function(token, proyecto){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.post('/proyecto/', proyecto, config)
  .then(response => {
    return response.data;
  });
}

proyecto.update = function(token,proyecto){
//
const config = {
  headers: {'Authorization': "token "+token}
}

return API.put('/proyecto/'+proyecto.id+'/',proyecto,config).then(
  response=>{
    return response
  }
)
}


proyecto.read_a = function(token, pk){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get("/proyecto/"+pk+"/",config).then(response=>{
    return response.data
  })
}



proyecto.read_idea = function(token, proyecto_id){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/proyecto/'+proyecto_id+'/idea/', config).then(
    response =>{
      return response.data
    }
  )
}

proyecto.read_estudiante = function(token, proyecto_id){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/proyecto/'+proyecto_id+'/estudiante/', config).then(
    response =>{
      return response.data
    }
  )
}

proyecto.read_materia = function(token, proyecto_id){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/proyecto/'+proyecto_id+'/materia/', config).then(
    response=>{
      return response.data
    }
  )
}





proyecto.read_repos = function(token, proyecto_id){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get('/proyecto/'+proyecto_id+'/repositorios/', config).then(
    response=>{
    return response.data
    }
  )
}

export default proyecto
