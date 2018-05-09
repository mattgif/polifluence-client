import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMembers } from "./actions";
import './App.css';
import MemberTable from './components/member-table/member-table';
import Search from './components/search';

class App extends Component {
    componentDidMount() {
        return this.props.dispatch(fetchMembers());
    }
    render() {
        const { searchType } = this.props;
        let results;
        if (searchType === 'member') {
            results = <MemberTable/>
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
    searchType: state.polifluence.searchType,
    billResults: state.polifluence.billResults
});
export default connect(mapStateToProps)(App);
