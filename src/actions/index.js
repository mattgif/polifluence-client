import { API_BASE_URL } from '../config';

export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';
export const fetchMembersSuccess = members => ({
    type: FETCH_MEMBERS_SUCCESS,
    members
});

export const FETCH_MEMBERS_ERROR = 'FETCH_MEMBERS_ERROR';
export const fetchMembersError = () => ({
    type: FETCH_MEMBERS_ERROR
});

export const FETCH_MEMBERS_REQUEST = 'FETCH_MEMBERS_REQUEST';
export const fetchMembersRequest = () => ({
    type: FETCH_MEMBERS_REQUEST
});

export const fetchMembers = () => (dispatch) => {
    dispatch(fetchMembersRequest());
    return fetch(`${API_BASE_URL}/members`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => dispatch(fetchMembersSuccess(res)))
        .catch(err => {
            console.error(err);
            fetchMembersError()
        })
};

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const changeSearchTerm = searchTerm => ({
    type: CHANGE_SEARCH_TERM,
    searchTerm
});

export const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM';
export const clearSearchTerm = () => ({
    type: CLEAR_SEARCH_TERM
});

export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const setSearchType = searchType => ({
    type: SET_SEARCH_TYPE,
    searchType
});