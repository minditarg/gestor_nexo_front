import { createStore } from 'redux';
import reducerDefault from './reducerDefault'

const storeDefault = createStore(reducerDefault);

export default storeDefault;
