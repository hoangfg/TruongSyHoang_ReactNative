import axios from "axios"


const ApiManager = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    responseType: 'json',
    withCredentials: true
})
export default ApiManager