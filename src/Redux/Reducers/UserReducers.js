
import {
    USER_FETCHING_REQUEST, USER_FETCHING_SUCCESS, USER_FETCHING_FAIL, USER_CREATION_SUCCESS, USER_CREATION_REQUEST, USER_CREATION_FAIL
} from "../types";



export function FetchuserReducer(state = { JobList: JSON.parse(localStorage.getItem('')) }, action) {
    switch (action.type) {
        case USER_FETCHING_REQUEST:
            return { loading: true };
        case USER_FETCHING_SUCCESS:
            return { loading: false, ClientList: action.payload };
        case USER_FETCHING_FAIL:
            return { loading: false };

        case USER_CREATION_REQUEST:
            return { loading: true, success: false };
        case USER_CREATION_SUCCESS:
            return { loading: false, ClientList: action.payload, success: true };

        case USER_CREATION_FAIL:
            return { loading: false };

        default: return state;
    }
}
