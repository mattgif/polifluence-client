import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMembers } from "./actions";
import logo from './logo.svg';
import './App.css';

class App extends Component {
    componentDidMount() {
        return this.props.dispatch(fetchMembers());
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   members: state.polifluence.members
});
export default connect(mapStateToProps)(App);
