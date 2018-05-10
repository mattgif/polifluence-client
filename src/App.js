import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchMembers} from "./actions";
import './App.css';
import MemberTable from './components/member-table/member-table';
import BillTable from './components/bill-table';
import Search from './components/search';

class App extends Component {
    componentDidMount() {
        return this.props.dispatch(fetchMembers());
    }

    render() {
        const { searchType, billResults, searchingBills, billsNotFound, searchTerm } = this.props;
        let results;
        if (searchType === 'member' && searchTerm) {
            results = <MemberTable/>
        } else if ( billResults.length || searchingBills || billsNotFound ) {
            // user has successfully searched, is searching, or searched but failed for bills
            results = <BillTable/>
        }
        return (
            <div className="App">
                <Search/>
                { results }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchTerm: state.polifluence.searchTerm,
    searchType: state.polifluence.searchType,
    billResults: state.polifluence.billResults,
    searchingBills: state.polifluence.searchingBills,
    billsNotFound: state.polifluence.billsNotFound
});
export default connect(mapStateToProps)(App);
