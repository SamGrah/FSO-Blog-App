import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const submitLogin = (username, password) => {
  const submittedInfo = {
    username,
    password
  }
  const request = axios.post('/api/login', submittedInfo)
  return request.then(response => response.data)
}

const users = { getAll, submitLogin }
export default users 