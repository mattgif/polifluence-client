import React from 'react';
import {connect} from 'react-redux';
import './banner.css'
import {clearSearchTerm} from "../../actions";

export class Banner extends React.Component {
    handleClick() {
        this.props.dispatch(clearSearchTerm())
    }
    render() {
        // main site header
        const compact = !!this.props.searchTerm;
        const hiddenStyle = {
            width: 0,
            height: 0,
            opacity: 0,
            overflow: 'hidden'
        };
        const brand = <h1 onClick={() => this.handleClick()}>
            <span className="brand__first">pol</span><span style={{color: '#ff7530'}}>i</span><span
            className="brand__last">fluence</span>
        </h1>;
        const intro = (
            <p style={compact ? hiddenStyle : {}}>
                Search for bills or members of Congress to discover who's donating to the people making our laws.
            </p>
        );

        return (
            <header className={compact ? "site__header" : "site__header full"}>
                {brand}
                {intro}
            </header>
        )
    }
}

const mapStateToProps = state => ({
    searchTerm: state.polifluence.searchTerm
});

export default connect(mapStateToProps)(Banner);