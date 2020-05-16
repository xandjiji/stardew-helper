import React, { Component } from 'react'

import '../css/settingsOption.css';
import { ReactComponent as SmallArrow } from '../assets/small-arrow.svg';

export class SettingsOption extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ active: !this.state.active });
    }

    render() {

        let buttonClass = '';
        if (this.state.active) {
            buttonClass = 'active';
        }

        return (
            <div className={`option-wrapper ${buttonClass}`} onClick={this.handleClick}>
                <div className="option-head inner-container">
                    {this.props.title}
                    <SmallArrow />
                </div>

                <div className="option-content inner-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SettingsOption
