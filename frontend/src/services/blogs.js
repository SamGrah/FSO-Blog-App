import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (newObject) => {
  const endpoint = `${baseUrl}/${newObject.id}`
  const response = await axios.put(endpoint, newObject, getConfig())
  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getConfig())
  return response.data
}

const blogService = { 
  getAll, 
  create, 
  update, 
  remove,
  setToken
}
export default blogService 