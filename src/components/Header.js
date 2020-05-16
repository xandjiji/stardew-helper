import React, { Component } from 'react'

import '../css/header.css';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as BackArrow } from '../assets/arrow.svg';

export class Header extends Component {
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
            <div className="header-bar">
                <div className="settings-button container">
                    <SettingsIcon className={buttonClass} onClick={this.handleClick} />
                </div>

                <div className={`sidebar ${buttonClass}`}>
                    <div className="sidebar-header">
                        <div className="sidebar-header-wrapper container">
                            <BackArrow onClick={this.handleClick} />
                            <span>Settings</span>
                        </div>
                    </div>
                </div>
                <div className={`backdrop ${buttonClass}`} onClick={this.handleClick} ></div>
            </div>
        )
    }
}

export default Header
