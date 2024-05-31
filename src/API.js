import axios from "axios"
import { storeS } from './storeS.js'

axios.defaults.baseURL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    storeS.preloader = true;    
    return config;
}, function (error) {
    console.error(error);
    
    return Promise.reject(error)
});

// Add a response interceptor
axios.interceptors.response.use(function (response) { 
    storeS.preloader = false;
    return response;

}, function (error) {
    alert(error.response.data.message)

    return Promise.reject(error)
})

export class Start {
    getToken() {
        return axios.get('/token').then(response => response.data)
    }
}

export class userBase {

    getPositions() {
        return axios.get('/positions').then(response => response.data)
    }

    getUsers(obj) {
        return axios.get('/users', {params: obj}).then(response => response.data)
    }

    getUser(id) {
        return axios.get(`/users/${id}`).then(response => response.data)
    }

    addUser(obj, headers) {
        return axios.post(`/users`, obj, {headers}).then(response => response?.data)
    }
}