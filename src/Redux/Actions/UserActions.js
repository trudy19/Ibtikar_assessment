import {
    USER_EDIT_FAIL, USER_EDIT_SUCCESS, BUSER_EDIT_REQUEST
    , USER_FETCHING_REQUEST, USER_FETCHING_SUCCESS, USER_FETCHING_FAIL, USER_CREATION_SUCCESS, USER_CREATION_REQUEST, USER_CREATION_FAIL
} from "../types";

export const FetchuserAction = (username) => async (dispatch, getState) => {
    dispatch({ type: USER_FETCHING_REQUEST });

    try {
        let data = JSON.parse(localStorage.getItem("LISTCLIENT"));
        dispatch({ type: USER_FETCHING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_FETCHING_FAIL, payload: error.message });
    }
}


export const CreationuserAction = (username) => async (dispatch, getState) => {
    dispatch({ type: USER_CREATION_REQUEST });
    var a = [];
    try {
        a = JSON.parse(localStorage.getItem("LISTCLIENT")) || [];
        a.push(username);
        localStorage.setItem("LISTCLIENT", JSON.stringify(a));
        dispatch({ type: USER_CREATION_SUCCESS, payload: a });
    } catch (error) {
        dispatch({ type: USER_CREATION_FAIL, payload: error.message });
    }
}






