import APIGit from '../http-commons-github'
import axios from 'axios'
import qs from 'qs'
import API from '../http-common'

const github = {}

github.listar_repositorio = function(){
  var data = {
    codigo: codigo
  }

  var config = {
    headers: {'Authorization': "token "+localStorage.getItem("token")}
  }

  return API.post('/usuario/github/', data, config)
}

github.crear_token = function(codigo, token){
    console.log("Esta entrando a crear token en github js")

    var data = {
      codigo: codigo
    }

    var config = {
      headers: {'Authorization': "token "+token}
    }

    return API.post('/usuario/github/', data, config)

}

github.listar_repositorio =  function(token){
    const config = {
        headers: {'Authorization': "token "+token}
      }
    return API.get('/usuario/github/repos/',config)
}

export default github
