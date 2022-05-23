import { createStore } from 'redux'

const initialState = { counter: 0, showCounter: true, loginState: false };

const storeReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            ...state,
            counter: state.counter + 1,
            // showCounter: state.showCounter
        }
    }
    if (action.type === 'decrement') {
        return {
            ...state,
            counter: state.counter - 1,
            // showCounter: state.showCounter
        }
    }
    if (action.type === 'increase') {
        return {
            ...state,
            counter: state.counter + action.value,
            // showCounter: state.showCounter
        }
    }
    if (action.type === 'toggle') {
        return {
            ...state,
            showCounter: !state.showCounter,
        }
    }
    if (action.type === 'login') {
        return {
            ...state,
            loginState: true
        }
    }
    return state;
}

const userstore = createStore(storeReducer);
export default userstore;