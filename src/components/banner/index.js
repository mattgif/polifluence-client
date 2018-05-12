import React from 'react';
import {connect} from 'react-redux';
import './banner.css'

export function Banner(props) {
    // main site header
    const compact = !!props.searchTerm;
    const hiddenStyle = {
        width: 0,
        height: 0,
        opacity: 0,
        overflow: 'hidden'
    };
    const brand = <h1 style={{fontFamily:'Raleway, sans-serif'}}><span style={{color:'#21409a'}}>pol</span><span style={{color:'#ff7530'}}>i</span><span style={{color:'#333'}}>fluence</span></h1>;
    const intro = (
        <p style={compact ? hiddenStyle : {}}>
            Search for bills or members of Congress to discover who's donating to the people making our laws.
        </p>
    );
    const instructions = (
        <p className="instructions">Click on a row to view more information.</p>
    );


    return (
        <header className={compact ? "site__header" : "site__header full"}>
            {brand}
            {intro}
            {instructions}
        </header>
    )
}

const mapStateToProps = state => ({
    searchTerm: state.polifluence.searchTerm
});

export default connect(mapStateToProps)(Banner);