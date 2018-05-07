import React from 'react';

export default class ExpandableRow extends React.Component {
    /**
     * return tbody, intended to be used as table row. 'row' expands on click to reveal additional data
     *
     * @param props
     * @typedef {object} data - data to be formatted
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
        const { expanded, data } = this.props;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };
        const top = data.map(data => formatTopData(data));
        const bot = data.map(data => formatExpanded(data));

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