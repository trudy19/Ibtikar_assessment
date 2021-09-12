import {
    BUILDING_DELITING_SUCCESS, BUILDING_DELITING_FAIL, BUILDING_DELITING_REQUEST
    , BUILDING_EDIT_FAIL, BUILDING_EDIT_SUCCESS, BUILDING_EDIT_REQUEST
    , BUILDING_FETCHING_REQUEST, BUILDING_FETCHING_SUCCESS, BUILDING_FETCHING_FAIL, BUILDING_CREATION_SUCCESS, BUILDING_CREATION_REQUEST, BUILDING_CREATION_FAIL
} from "../types";


export const FetchbuildingAction = (client) => async (dispatch, getState) => {
    dispatch({ type: BUILDING_FETCHING_REQUEST });
    console.log(client)

    try {
        let data = JSON.parse(localStorage.getItem(client));
        console.log("dzd")
        dispatch({ type: BUILDING_FETCHING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BUILDING_FETCHING_FAIL, payload: error.message });
    }
}
export const CreationbuildingAction = (client, data) => async (dispatch, getState) => {
    dispatch({ type: BUILDING_CREATION_REQUEST });
    var a = [];
    try {
        a = JSON.parse(localStorage.getItem(client)) || [];
        a.push(data);
        localStorage.setItem(client, JSON.stringify(a));
        dispatch({ type: BUILDING_CREATION_SUCCESS, payload: a });

    } catch (error) {
        dispatch({ type: BUILDING_CREATION_FAIL, payload: error.message });
    }
}

export const EditbuildingAction = (client, index, data) => async (dispatch, getState) => {
    dispatch({ type: BUILDING_EDIT_REQUEST });
    var a = [];
    try {

        a = JSON.parse(localStorage.getItem(client)) || [];
        a[index] = data;
        localStorage.setItem(client, JSON.stringify(a));
        dispatch({ type: BUILDING_EDIT_SUCCESS, payload: a });

    } catch (error) {
        dispatch({ type: BUILDING_EDIT_FAIL, payload: error.message });
    }
}




export const deletebuilding = (client, index) => async (dispatch, getState) => {

    const { deletebuild: { deletee }, } = getState();

    dispatch({ type: BUILDING_DELITING_REQUEST });
    var a = [];
    try {
        console.log(client)
        a = JSON.parse(localStorage.getItem(client)) || [];
        console.log(a)
        a.splice(index, 1);
        console.log(a)
        localStorage.setItem(client, JSON.stringify(a));
        dispatch({ type: BUILDING_DELITING_SUCCESS, payload: !deletee });
    } catch (error) {
        dispatch({ type: BUILDING_DELITING_FAIL, payload: error.message });
    }
}


