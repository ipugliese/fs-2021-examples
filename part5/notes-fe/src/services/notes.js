import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  return axios
          .get(baseUrl)
          .then(response => response.data.concat(
              {
                id: 10000,
                content: 'This note is not saved to server',
                date: '2019-05-30T17:30:31.098Z',
                important: true,
              }
          ))
}

const create = newObject => {
  return axios
          .post(baseUrl, newObject)
          .then(response => response.data)
}

const update = (id, newObject) => {
  return axios
          .put(`${baseUrl}/${id}`, newObject)
          .then(response => response.data)
}

const notes = { 
  getAll, 
  create, 
  update 
}

export default notes