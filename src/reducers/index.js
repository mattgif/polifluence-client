import {
    CHANGE_SEARCH_TERM, CLEAR_SEARCH_TERM, FETCH_BILLS_BY_MEMBER_REQUEST, FETCH_BILLS_BY_MEMBER_SUCCESS,
    FETCH_MEMBERS_ERROR, FETCH_MEMBERS_REQUEST,
    FETCH_MEMBERS_SUCCESS,
    SET_SEARCH_TYPE
} from "../actions";

const initialState = {
    members: [],
    error: undefined,
    loading: false,
    searchTerm: '',
    searchType: 'member',
    bills: {},
    fetchedBillsForMember: {},
    fetchingBills: false
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

    else if (action.type === FETCH_BILLS_BY_MEMBER_REQUEST) {
        return {...state, fetchingBills: true}
    }

    else if (action.type === FETCH_BILLS_BY_MEMBER_SUCCESS) {
        const updatedState = Object.assign({}, state);
        action.bills.forEach(bill => {
            updatedState.bills = {
                ...updatedState.bills,
                [bill.id]: bill
            };
        });
        updatedState.fetchingBills = false;
        updatedState.fetchedBillsForMember = {
            ...updatedState.fetchedBillsForMember,
            [action.memberId]: true
        };
        return updatedState;
    }

    return state;
};