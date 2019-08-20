import axios from 'axios'

const api = axios.create({
    baseURL: 'https://Localhost:3000'
})

export default api