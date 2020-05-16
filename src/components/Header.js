import React, { Component } from 'react'

import '../css/header.css';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';

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
        if(this.state.active) {
            buttonClass = 'active';
        }

        return (
            <div className="header-bar">
                <div className="settings-button">
                    <SettingsIcon className={buttonClass} onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}

export default Header
