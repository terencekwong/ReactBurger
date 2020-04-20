const redux = require('redux');
const createStore = redux.createStore;

const initalState = {
    counter: 0
}

// Reducer
const rootReducer = (state = initalState, action) => {
    if (action.type === 'INC_CONUTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }

    if (action.type === 'ADD_CONUTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }

    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    return console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({type: 'INC_CONUTER'});
store.dispatch({type: 'ADD_CONUTER', value: 10});
console.log(store.getState());