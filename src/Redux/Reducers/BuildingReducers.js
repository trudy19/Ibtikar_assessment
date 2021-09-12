import {
  BUILDING_DELITING_SUCCESS, BUILDING_EDIT_FAIL, BUILDING_EDIT_SUCCESS, BUILDING_EDIT_REQUEST, BUILDING_CLEAN
  , BUILDING_FETCHING_REQUEST, BUILDING_FETCHING_SUCCESS, BUILDING_FETCHING_FAIL, BUILDING_CREATION_SUCCESS, BUILDING_CREATION_REQUEST, BUILDING_CREATION_FAIL
} from "../types";

function FetchBuilding(state = { JobList: JSON.parse(localStorage.getItem('')) }, action) {
  switch (action.type) {
    case BUILDING_FETCHING_REQUEST:
      return { loading: true, };
    case BUILDING_FETCHING_SUCCESS:
      return { loading: false, BuildingList: action.payload };
    case BUILDING_FETCHING_FAIL:
      return { loading: false };

    case BUILDING_FETCHING_REQUEST:
      return { loading: true, success: false };
    case BUILDING_CREATION_SUCCESS:
      return { loading: false, BuildingList: action.payload, success: true };
    case BUILDING_CLEAN:
      return { success: false };
    case BUILDING_CREATION_FAIL:
      return { loading: false };

    case BUILDING_EDIT_REQUEST:
      return { loading: true, success: false };
    case BUILDING_EDIT_SUCCESS:
      return { loading: false, BuildingList: action.payload, success: true };
    case BUILDING_EDIT_FAIL:
      return { loading: false };


    default: return state;
  }
}





function DelelteBuilding(state = {}, action) {
  switch (action.type) {
    case BUILDING_DELITING_SUCCESS:
      return { deletee: action.payload };



    default: return state;
  }
}

export {
  FetchBuilding, DelelteBuilding
}