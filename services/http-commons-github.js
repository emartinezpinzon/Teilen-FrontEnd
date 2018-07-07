import axios from 'axios'

const APIGit = axios.create({
  baseURL: `https://github.com`,
  headers: {"Content-Type": "application/x-www-form-urlencoded"} ,
  
    emulateJSON:true,
    responseType: 'json'
    
  
})

export default APIGit
