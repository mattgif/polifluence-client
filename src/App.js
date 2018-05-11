import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchMembers, fetchRecentBills} from "./actions";
import './App.css';
import MemberTable from './components/member-table/member-table';
import BillTable from './components/bill-table';
import Search from './components/search';
import 'reset.css';
import './components/state-fonts/stateface.css';
import './components/expandable-table.css';

class App extends Component {
    componentDidMount() {
        return this.props.dispatch(fetchMembers())
            .then(() => this.props.dispatch(fetchRecentBills()));
    }

    render() {
        const { members, searchType, billResults, searchingBills, recentBills, fetchingRecent, billsNotFound, searchTerm } = this.props;
        let results;
        if (searchType === 'member' && searchTerm) {
            results = <MemberTable members={members}
                                   showBills={true}/>
        } else if ( billResults.length || searchingBills || billsNotFound ) {
            // user has successfully searched, is searching, or searched but failed for bills
            results = <BillTable billResults={billResults}
                                 loading={searchingBills}
                                 showSponsor={true}
            />
        } else {
            results = <BillTable billResults={recentBills}
                                 loading={fetchingRecent}
                                 showSponsor={true}
            />
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
    members: state.polifluence.members,
    searchTerm: state.polifluence.searchTerm,
    searchType: state.polifluence.searchType,
    billResults: state.polifluence.billResults,
    searchingBills: state.polifluence.searchingBills,
    billsNotFound: state.polifluence.billsNotFound,
    fetchingRecent: state.polifluence.fetchingRecent,
    recentBills: state.polifluence.recentBills
});
export default connect(mapStateToProps)(App);
