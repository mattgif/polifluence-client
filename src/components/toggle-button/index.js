import React from 'react';
import IoChevronRight from 'react-icons/lib/io/chevron-right';
import IoChevronDown from 'react-icons/lib/io/chevron-down';
import './toggle-button.css';

export default class ToggleButton extends React.Component {
    // button used to toggle display of section
    // toggleAction prop is the action to be performed when button is toggled
    // text is the text to be displayed when button is in closed state;
    // open text is optional text to be displayed when in open state (if none provided, defaults to above text property)

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.startOpen || false
        }
    }

    handleToggle() {
        this.setState({open: !this.state.open});
        this.props.toggleAction();
    }
    render() {
        let { text, openText, className } = this.props;
        const { open } = this.state;
        if (!openText) {
            openText = text;
        }

        return (
            <button className={`toggle ${className}`} onClick={() => this.handleToggle()}>{open ? <IoChevronDown/> : <IoChevronRight/>} {open ? openText : text}</button>
        )
    }
}

