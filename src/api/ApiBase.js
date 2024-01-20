import axios from "axios"


const ApiBase = axios.create({
    baseURL: "http://192.168.38.236:8080/api",
    responseType: 'json',
    withCredentials: true
})
export default ApiBase