import axios from "axios"


const ApiBase = axios.create({
    baseURL: "http://192.168.38.236:8080/api",
    //192.168.38.236
    responseType: 'json',
    withCredentials: true
})
export default ApiBase