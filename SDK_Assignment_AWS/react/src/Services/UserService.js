import axios from 'axios'

const USER_BASE_URL = 'http://localhost:3030'

const headers = {
    'Content-Type': 'application/json'
}

class UserService {
    getBuckets() {
        return axios.get(USER_BASE_URL + '/s3/list')
    }
    createBucket(data) {
        return axios.post(USER_BASE_URL + '/s3/create', data, { headers: headers });
    }
    deleteBucket(name) {
        return axios.delete(USER_BASE_URL + '/s3/delete/' + name);
    }
    getObjects(name) {
        return axios.get(USER_BASE_URL + '/s3/listobj/' + name);
    }

    getInstance() {
        return axios.get(USER_BASE_URL + "/ec2/list");
    }
    changeStatus(state, id) {
        return axios.get(USER_BASE_URL + '/ec2/state/' + state + '/' + id);
    }
    createInstance(data) {
        return axios.post(USER_BASE_URL + "/ec2/create", data, { headers: headers })
    }
    terminateInstance(id) {
        return axios.delete(USER_BASE_URL + "/ec2/terminate/" + id)
    }
}

export default new UserService()