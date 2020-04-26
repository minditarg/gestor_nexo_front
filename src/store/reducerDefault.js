const initialState = {
    counter: 0
};

const reducerDefault = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'INCREMENT':
            return {
              ...state,
              counter: state.counter + 1
            };

    }
    return state;
};


export default reducerDefault;
