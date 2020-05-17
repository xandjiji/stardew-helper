import React, { Component } from 'react'

import SettingsOption from './SettingsOption';
import IEdata from './IEdata';

import '../css/header.css';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as BackArrow } from '../assets/arrow.svg';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleClick() {
        this.setState({ active: !this.state.active });
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.setState({ active: false });
        }
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

                    <div className="sidebar-body">
                        <nav className="container">
                            <SettingsOption title="Mode">
                                Teste
                            </SettingsOption>
                            <SettingsOption title="Theme">
                                Teste
                            </SettingsOption>
                            <SettingsOption title="Import/Export data">
                                <IEdata />
                            </SettingsOption>
                            <SettingsOption title="Reset data">
                                Teste
                            </SettingsOption>
                        </nav>

                        <div className="sidebar-footer">
                            <div className="container">
                                <a className="git-icon" href="https://github.com/xandjiji/stardew-helper"><GithubIcon /></a> made by <a className="git-profile" href="https://github.com/xandjiji">xandjiji</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`backdrop ${buttonClass}`} onClick={this.handleClick} ></div>
            </div>
        )
    }
}

export default Header
