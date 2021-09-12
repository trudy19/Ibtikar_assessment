import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {  DelelteBuilding, FetchBuilding } from "./Reducers/BuildingReducers";
import { FetchuserReducer } from "./Reducers/UserReducers";

const initialState = {

};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        buildings: FetchBuilding,
        users: FetchuserReducer,
        deletebuild: DelelteBuilding
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;
