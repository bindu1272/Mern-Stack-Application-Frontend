import axios from "axios";
import { getLocalStrorage } from "./authorization";
const axiosInstance = axios.create({
    headers :{"content-type":"application/json"} 
})

const baseUrl = "http://localhost:3000/api"

export const api=async({method="get",url="",body=""})=>{
    return  await new Promise((resolve,reject)=>{
        axiosInstance.defaults.headers.common['Authorization'] = getLocalStrorage('token')? `Bearer ${getLocalStrorage('token')}`: ''
        axiosInstance[method](`${baseUrl}${url}`,body ? body: "")
        .then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error);
        })
    })
}