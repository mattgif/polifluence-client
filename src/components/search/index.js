import React from 'react';
import {connect} from 'react-redux';
import {changeSearchTerm, setSearchType} from "../../actions";

export class Search extends React.Component {
    handleSearchTermChange = e => {
        const searchTerm = e.target.value;
        this.props.dispatch(changeSearchTerm(searchTerm));
    };

    handleTypeChange = e => {
        const type = e.target.value;
        this.props.dispatch(setSearchType(type))
    };

    render() {
        const {searchTerm, searchType} = this.props;
        return (
            <form>
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
            </form>
        )
    }
}

const mapStateToProps = state => ({
    searchTerm: state.polifluence.searchTerm,
    searchType: state.polifluence.searchType
});

export default connect(mapStateToProps)(Search)