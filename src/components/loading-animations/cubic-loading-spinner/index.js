import React from 'react'
import './cubic-loading-spinner.css'

export default function CubicLoadingSpinner(props) {
    const prefixedClassName = className => {
        // optional prefix for CSS styling
        let prefixed = '';
        if (props.prefix) {
            prefixed = ` ${props.prefix}__${className}`
        }
        return className + prefixed
    };

    return (
        <div className={prefixedClassName("spinner")}>
            <div className={prefixedClassName("cube1")}/>
            <div className={prefixedClassName("cube2")}/>
        </div>
    )
}