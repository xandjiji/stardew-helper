import React, { Component } from 'react'
import { connect } from "react-redux";

import HeaderOptions from './HeaderOptions';

import '../css/header.css';
import themes from '../themes.json';

import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as BundleIcon } from '../assets/gift.svg';
import { ReactComponent as SeasonIcon } from '../assets/cloudy.svg';
import { ReactComponent as BackArrow } from '../assets/arrow.svg';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: false
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
        this.setState({ menuActive: !this.state.menuActive });
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.setState({ menuActive: false });
        }
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        const { mode } = this.props;

        let buttonClass = '';
        if (this.state.menuActive) {
            buttonClass = 'active';
        }

        return (
            <div className="header-bar" style={{ backgroundColor: palette.surface }}>
                <div className="settings-button container">
                    <div className="modes-wrapper">
                        <BundleIcon className={mode === 'bundle' ? 'active' : '' } onClick={() => this.props.setMode('bundle')} />
                        <SeasonIcon className={mode === 'season' ? 'active' : '' } onClick={() => this.props.setMode('season')} />
                    </div>
                    <SettingsIcon className={`settings ${buttonClass}`} onClick={this.handleClick} />
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

    return {
        mode: state.modeReducer.mode,
        themeId: state.themeReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setMode: (mode) => {
            dispatch({
                type: "SET_MODE",
                payload: mode
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);