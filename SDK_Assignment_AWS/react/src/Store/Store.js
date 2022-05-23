import { createStore } from 'redux'

const initialState = {
    buckets: []
};
const crudReducer = (state = initialState, action) => {

    if (action.type === 'buckets') {
        return {
            ...state,
            buckets: action.value
        }
    }

    return state;
};
const crudStore = createStore(crudReducer);
export default crudStore;
