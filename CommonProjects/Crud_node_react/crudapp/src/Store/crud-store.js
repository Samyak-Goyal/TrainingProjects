import { createStore } from 'redux'

const initialState = {
    email: '',
    password: '',
    isLogged: '',
    users: [],
    fullname: '',
    usermail: '',
    userpassword:'',
    userphone: '',
    usergender :'Male',
    id: ''
}
const crudReducer = (state = initialState, action) => {
    if (action.type === 'email') {
        return {
            ...state,
            email: action.value
        }
    }
    if (action.type === 'password') {
        return {
            ...state,
            password: action.value
        }
    }
    if (action.type === 'logged') {
        return {
            ...state,
            isLogged: action.value
        }
    }
    if (action.type === 'users') {
        return {
            ...state,
            users: action.value
        }
    }
    if (action.type === 'fullname') {
        return {
            ...state,
            fullname: action.value
        }
    }
    if (action.type === 'usermail') {
        return {
            ...state,
            usermail: action.value
        }
    }
    if (action.type === 'userpassword') {
        return {
            ...state,
            userpassword: action.value
        }
    }
    if (action.type === 'userphone') {
        return {
            ...state,
            userphone: action.value
        }
    }
    if (action.type === 'usergender') {
        return {
            ...state,
            usergender: action.value
        }
    }
    return state;
}

const crudStore = createStore(crudReducer)

export default crudStore