import React from 'react';

export default class ExpandableRow extends React.Component {
    /**
     * return tbody, intended to be used as table row. 'row' expands on click to reveal additional data
     *
     */

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        const { topSection, expandedSection } = this.props;
        const { expanded } = this.state;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };

        return (
            <tbody>
            <tr onClick={() => this.setState({expanded: !expanded})}>
                {topSection}
            </tr>
            <tr><td  colSpan={topSection.length} className={expanded ? 'expanded' : 'collapsed'} style={expanded ? {} : collapsedStyle}>
                {expandedSection}
            </td></tr>
            </tbody>
        )
    }
}