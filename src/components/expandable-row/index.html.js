import React from 'react';

export default class ExpandableRow extends React.Component {
    /**
     * return tbody, intended to be used as table row. 'row' expands on click to reveal additional data
     *
     * @param props
     * @typedef {object} (array) topData - array of data to be included in always-visible row
     * @typedef {object} expandedData - data to be shown only when row expanded
     * @typedef {function} formatExpanded - function to return formatted expandedData
     * @typedef {function} formatTopData - function that returns a formatted array of td elements
     */

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        const { expanded, topData, expandedData } = this.props;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };
        const top = topData.map(data => formatTopData(data));
        const bot = expandedData.map(data => formatExpanded(data));

        return (
            <tbody>
            <tr onClick={() => this.setState({expanded: !expanded})}>
                {top}
            </tr>
            <tr><td  colSpan={top.length} className={expanded ? 'expanded' : 'collapsed'} style={expanded ? '' : collapsedStyle}>
                {bot}
            </td></tr>
            </tbody>
        )
    }
}