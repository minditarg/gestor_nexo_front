import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    insumos: []
};


const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.GUARDA_LISTADO_INSUMOS:
          return {
            updateObject(state, {insumos: action.insumos});
          break;

  }
  return state;
};

export default reducer;
