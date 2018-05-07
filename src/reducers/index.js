import {
    CHANGE_SEARCH_TERM, CLEAR_SEARCH_TERM, FETCH_MEMBERS_ERROR, FETCH_MEMBERS_REQUEST, FETCH_MEMBERS_SUCCESS,
    SET_SEARCH_TYPE
} from "../actions";

const initialState = {
    members: [],
    error: undefined,
    loading: false,
    searchTerm: undefined,
    searchType: 'member'
};

export const polifluenceReducer = (state = initialState, action) => {
    if (action.type === FETCH_MEMBERS_SUCCESS) {
        return {...state, members: action.members, loading: false, error: undefined}
    }

    else if (action.type === FETCH_MEMBERS_ERROR) {
        return {...state, error: action.message, loading: false}
    }

    else if (action.type === FETCH_MEMBERS_REQUEST) {
        return {...state, error: undefined, loading: true}
    }

    else if (action.type === SET_SEARCH_TYPE) {
        return {...state, searchType: action.searchType}
    }

    else if (action.type === CHANGE_SEARCH_TERM) {
        return {...state, searchTerm: action.searchTerm}
    }

    else if (action.type === CLEAR_SEARCH_TERM) {
        return {...state, searchTerm: undefined}
    }

    return state;
};