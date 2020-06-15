import React, { Component } from 'react'

import '../css/dotsPicker.css';

export class DotsPicker extends Component {
    render() {
        const { notifyClose } = this.props;

        return (
            <div className="dots-picker-wrapper">
                <div className={`cat-picker ${this.props.isActive ? 'active' : ''}`}>
                    <div className="radio-option">Bundle Mode</div>
                    <div className="radio-option">Season Mode</div>
                </div>
                
                <div className={`cat-backdrop ${this.props.isActive ? 'active' : ''}`} onClick={() => notifyClose()}></div>
            </div>
        )
    }
}

export default DotsPicker
