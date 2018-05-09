import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMembers } from "./actions";
import './App.css';
import MemberTable from './components/member-table/member-table'
import Search from './components/search';

class App extends Component {
    componentDidMount() {
        return this.props.dispatch(fetchMembers());
    }
    render() {
        return (
            <div className="App">
                <Search/>
                <MemberTable/>

            </div>
        );
    }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(App);
