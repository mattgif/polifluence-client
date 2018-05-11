import {
    CHANGE_SEARCH_TERM, CLEAR_SEARCH_TERM, FETCH_BILLS_BY_MEMBER_REQUEST, FETCH_BILLS_BY_MEMBER_SUCCESS,
    FETCH_MEMBERS_ERROR, FETCH_MEMBERS_REQUEST,
    FETCH_MEMBERS_SUCCESS, FETCH_RECENT_BILLS_REQUEST, FETCH_RECENT_BILLS_SUCCESS, SEARCH_BILLS_REQUEST,
    SEARCH_BILLS_SUCCESS,
    SET_SEARCH_TYPE
} from "../actions";

const initialState = {
    members: {},
    error: undefined,
    loading: false,
    searchTerm: '',
    searchType: 'member',
    bills: {},
    fetchedBillsForMember: {},
    billResults: [],
    fetchingBills: false,
    searchingBills: false,
    billsNotFound: false,
    fetchingRecent: true,
    recentBills: []
};

export const polifluenceReducer = (state = initialState, action) => {
    if (action.type === FETCH_MEMBERS_SUCCESS) {
        const members = {};
        action.members.forEach(member => members[member.memberId] = member);
        return {...state, members, loading: false, error: undefined}
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

    else if (action.type === SEARCH_BILLS_REQUEST) {
        return {...state, searchingBills: true}
    }

    else if (action.type === SEARCH_BILLS_SUCCESS) {
        const updatedState = Object.assign({}, state);
        const billResults = [];
        action.bills.forEach(bill => {
            billResults.push(bill.id);
            updatedState.bills = {
                ...updatedState.bills,
                [bill.id]: bill
            };
        });
        updatedState.billsNotFound = !billResults.length;
        updatedState.billResults = billResults;
        updatedState.searchingBills = false;
        return updatedState;
    }

    else if (action.type === CLEAR_SEARCH_TERM) {
        const updatedState = Object.assign({}, state);
        updatedState.billResults = [];
        updatedState.billsNotFound = false;
        updatedState.searchingBills = false;
        updatedState.error = undefined;
        updatedState.loading = false;
        updatedState.searchTerm = '';
        return updatedState;
    }

    else if (action.type === FETCH_RECENT_BILLS_REQUEST) {
        return {...state, fetchingRecent: true}
    }

    else if (action.type === FETCH_RECENT_BILLS_SUCCESS) {
        const updatedState = Object.assign({}, state);
        const billResults = [];
        action.bills.forEach(bill => {
            billResults.push(bill.id);
            updatedState.bills = {
                ...updatedState.bills,
                [bill.id]: bill
            };
        });
        updatedState.recentBills = billResults;
        updatedState.fetchingRecent = false;
        return updatedState;
    }

    return state;
};