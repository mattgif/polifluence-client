import React from 'react';
import PropTypes from 'prop-types'

function applyFilters(filters, data) {
    /**
     * filters data (object or array) by checking if the field specified in the filter (object) matches the value specified in the filter
     * returns 0 if no results matching filters found in data
     * @constructor
     * @typedef {Object} filter - object used to filter displayed data
     * @property {string} field - data FIELD to be matched
     * @property {string} value - VALUE that field needs to match
     * @property {string} default - value of filter (e.g. 'none') if filter isn't applied. that is, if this.value === this.default, then filter is skipped
     */
    let filteredData = data;
    filters.forEach(filter => {
        if (filter.value !== filter.default) {
            if (Array.isArray(filteredData)) {
                filteredData = filteredData.filter(entry => entry[filter.field] === filter.value)
                if (!filteredData.length) {
                    return 0
                }
            } else if (typeof filteredData === 'object') {
                const reduced = {};
                Object.keys(filteredData).forEach(entry => {
                    if (filteredData[entry][filter.field] === filter.value) {
                        reduced[entry] = filteredData[entry]
                    }
                });
                filteredData = reduced;
                if (!Object.keys(filteredData).length) {
                    return 0
                }
            } else {
                //    data is not obj or array
                throw 'Data must be obj or array'
            }
        }
    });
    return filteredData;
}

function FilterTable(props) {
    /**
     * table that allows filtering of data
     * props are headers (array of header objects), filters (array of filter objects), data (array or object),
     * formatData (function) for formatting filtered results
     * @param props
     * @typedef {Object} header
     * @property {string} header.text - the title to be displayed
     * @property {int} colSpan - the number of columns header should span
     *
     * @typedef {Object} filter - object used to filter displayed data
     * @property {string} field - data FIELD to be matched
     * @property {string} value - VALUE that field needs to match
     * @property {string} default - value of filter (e.g. 'none') if filter isn't applied. that is, if this.value === this.default, then filter is skipped
     */
    const { headers, filters, data, formatData } = props;
    const tableHeaders = headers.map( (header, index) => <th key={index} colSpan={header.colSpan || 1}>header.text</th> );
    const filteredData = applyFilters(filters, data);
    let results = <h2 className="expandable__table__notfound">No results found</h2>; // assume no results found
    if (filteredData) {
        if (Array.isArray(filteredData)) {
            results = filteredData.map(entry => formatData(entry))
        } else {
            results = Object.keys(filteredData).map(entry => formatData(filteredData[entry]))
        }
    }


    return (
        <table cellSpacing={0} className="expandable__table">
            <thead>
            <tr>
                {tableHeaders}
            </tr>
            </thead>
            {results}
        </table>
    )
}

FilterTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object),
    formatData: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    filters: PropTypes.arrayOf(PropTypes.object)
};

export default FilterTable;