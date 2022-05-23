import axios from 'axios'

const USER_BASE_URL = 'http://localhost:3001/user' //url of node app
const headers = {
    'Content-Type': 'application/json',
    Authorization: "Token " + localStorage.getItem("token")
}

// if we want to use fetch instead of axios (include it in the class created below)
// fetch('url', {
//     method:'POST',
//     headers :{
//         'Content-Type' : 'application/json',
//         Authorization: 'Token '
//     }
// })

class UserService {
    loginUser(credentials) {
        return axios.post(USER_BASE_URL + "/login", credentials) //include headers as another parameter if needed
    }

    getUser() {
        return axios.get(USER_BASE_URL, { headers: headers })
    }

    postUser(users) {
        return axios.post(USER_BASE_URL, users, { headers: headers })
    }

    editUser(id,users){
        return axios.post(USER_BASE_URL + '/edit/' + id , users, {headers:headers})
    }

    deleteUser(id) {
        return axios.delete(USER_BASE_URL + "/" + id, { headers: headers })
    }

    userById(id){
        return axios.get(USER_BASE_URL + "/" + id, {headers:headers})
    }
}

export default new UserService()