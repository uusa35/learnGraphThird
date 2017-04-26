/**
 * Created by usamaahmed on 4/10/17.
 */
import { combineReducers } from 'redux';
import propertiesReducers from '../reducers/propertiesReducers';

let rootReducers = combineReducers({
    properties: propertiesReducers
})

export default rootReducers;