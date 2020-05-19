import React, { Component } from 'react'
import { connect } from "react-redux";

import HeaderOptions from './HeaderOptions';

import '../css/header.css';
import themes from '../themes.json';

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
        let palette = themes.themes[this.props.themeId];

        let buttonClass = '';
        if (this.state.active) {
            buttonClass = 'active';
        }

        return (
            <div className="header-bar" style={{ backgroundColor: palette.surface }}>
                <div className="settings-button container">
                    <SettingsIcon className={buttonClass} onClick={this.handleClick} />
                </div>

                <div className={`sidebar ${buttonClass}`} style={{ backgroundColor: palette.background }}>
                    <div className="sidebar-header" style={{ backgroundColor: palette.surface }}>
                        <div className="sidebar-header-wrapper container">
                            <BackArrow onClick={this.handleClick} />
                            <span>Settings</span>
                        </div>
                    </div>

                    <div className="sidebar-body">
                        <HeaderOptions />

                        <div className="sidebar-footer" style={{ backgroundColor: palette.primary, color: palette.primaryVariant }}>
                            <div className="container">
                                <a className="git-icon" href="https://github.com/xandjiji/stardew-helper" style={{ color: palette.onSurface, fill: palette.onPrimary }}><GithubIcon /></a>
                                made by
                                <a className="git-profile" href="https://github.com/xandjiji" style={{ color: palette.onPrimary }}>xandjiji</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`backdrop ${buttonClass}`} onClick={this.handleClick} ></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return { themeId: state.themeReducer };
};

function mapDispatchToProps(dispatch) {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);