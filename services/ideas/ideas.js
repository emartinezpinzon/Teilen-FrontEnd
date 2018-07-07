import API from '../http-common'

const ideas = {}

ideas.read = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get("/ideas/", config).then(response =>{
    return response.data;
  })
}

ideas.create = function(token, nombre, descripcion){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  var data = {
    nombre: nombre,
    descripcion: descripcion
  }

  return API.post('/ideas/', data, config)
  .then(response => {
    return response.data;
  });
}

ideas.read_a = function(token, id){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get("/ideas/"+id+"/me/", config).then(response =>{
    return response.data;
  })
}

ideas.read_all = function(token){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.get("/ideas/all/", config).then(response =>{
    return response.data;
  })
}

ideas.update = function(token, idea){
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.put('/ideas/'+idea.id+"/", idea, config)
  .then(response => {
    return response.data;
  });
}

ideas.delete = function(token, idea) {
  var config = {
    headers: {'Authorization': "token "+token}
  }

  return API.delete("/ideas/"+idea.id+"/", config).then(response =>{
    return response.data;
  })
}

export default ideas
