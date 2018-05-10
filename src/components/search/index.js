import React from 'react';
import {connect} from 'react-redux';
import {changeSearchTerm, clearSearchTerm, searchBills, setSearchType} from "../../actions";

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }
    }

    handleSearchTermChange = e => {
        const searchTerm = e.target.value;
        this.props.dispatch(changeSearchTerm(searchTerm));
        this.setState({ error: undefined })
    };

    handleTypeChange = e => {
        const type = e.target.value;
        this.props.dispatch(setSearchType(type))
    };

    handleSearchSubmit = e => {
        e.preventDefault();
        if (this.props.searchTerm.length >= 3) {
            return this.props.dispatch(searchBills(this.props.searchTerm))
        }

        this.setState({ error: 'Please enter a minimum of three characters to search'})
    };

    handleClearSearch(e) {
        e.preventDefault();
        this.props.dispatch(clearSearchTerm())
    }

    render() {
        const {searchTerm, searchType} = this.props;
        const { error } = this.state;
        let submitButton;
        if (searchType === 'bill') {
            submitButton = <button id="submitSearch" name="submitSearch">Search</button>
        }
        let errorMessage;
        if (error) {
            errorMessage = <p className="searchError">{error}</p>
        }

        return (
            <form onSubmit={e => this.handleSearchSubmit(e)}>
                <select name="searchType"
                        id="searchTypeSelector"
                        value={searchType}
                        onChange={e => this.handleTypeChange(e)}
                >
                    <option value="member">Member</option>
                    <option value="bill">Bill</option>
                </select>
                <input type="text"
                       name="search"
                       id="searchField"
                       value={searchTerm}
                       onChange={e => this.handleSearchTermChange(e)}
                />
                <button type="button" onClick={e => this.handleClearSearch(e)}>X</button>
                {submitButton}
                {errorMessage}
            </form>
        )
    }
}

const mapStateToProps = state => ({
    searchTerm: state.polifluence.searchTerm,
    searchType: state.polifluence.searchType
});

export default connect(mapStateToProps)(Search)