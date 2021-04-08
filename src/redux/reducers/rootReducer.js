import { combineReducers } from "redux";
import userReducer from './userReducer';
import alertReducer from './alertReducer';

const reducers = {
    user: userReducer,
    alertMesages: alertReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
