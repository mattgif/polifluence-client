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

export const FETCH_BILLS_BY_MEMBER_REQUEST = 'FETCH_BILLS_BY_MEMBER_REQUEST';
export const fetchBillsByMemberRequest = () => ({
    type: FETCH_BILLS_BY_MEMBER_REQUEST
});

export const FETCH_BILLS_BY_MEMBER_SUCCESS = 'FETCH_BILLS_BY_MEMBER_SUCCESS';
export const fetchBillsByMemberSuccess = (bills, memberId) => ({
    type: FETCH_BILLS_BY_MEMBER_SUCCESS,
    bills,
    memberId
});

export const fetchBillsByMember = memberId => dispatch => {
    dispatch(fetchBillsByMemberRequest());
    return fetch(`${API_BASE_URL}/members/${memberId}/bills`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(body => dispatch(fetchBillsByMemberSuccess(body.bills, memberId)))
};

export const SEARCH_BILLS_REQUEST = 'SEARCH_BILLS_REQUEST';
export const searchBillsRequest = () => ({
    type: SEARCH_BILLS_REQUEST
});

export const SEARCH_BILLS_SUCCESS = 'SEARCH_BILLS_SUCCESS';
export const searchBillsSuccess = bills => ({
    type: SEARCH_BILLS_SUCCESS,
    bills
});

export const searchBills = query => (dispatch) => {
    dispatch(searchBillsRequest());
    return fetch(`${API_BASE_URL}/bills/search?term=${query}`)
        .then(res => res.json())
        .then(body => dispatch(searchBillsSuccess(body.bills)))
};