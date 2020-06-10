import React, { Component } from 'react'
import { connect } from "react-redux";

import HeaderOptions from './HeaderOptions';

import '../css/header.css';

import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as BundleIcon } from '../assets/present.svg';
import { ReactComponent as SeasonIcon } from '../assets/cloudy.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as BackArrow } from '../assets/arrow.svg';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: false,
            viewportH: window.innerHeight
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('resize', this.handleResize);
    }

    handleClick() {
        this.setState({ menuActive: !this.state.menuActive });
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.setState({ menuActive: false });
        }
    }

    handleResize() {
        this.setState({ viewportH: window.innerHeight });
    }

    render() {
        const { mode } = this.props;

        let buttonClass = '';
        if (this.state.menuActive) {
            buttonClass = 'active';
        }

        return (
            <div className="header-bar">
                <div className="settings-button container">
                    <div className="modes-wrapper">
                        <BundleIcon className={mode === 'bundle' ? 'active' : ''} onClick={() => this.props.setMode('bundle')} />
                        <SeasonIcon className={mode === 'season' ? 'active' : ''} onClick={() => this.props.setMode('season')} />
                        <SearchIcon className={mode === 'search' ? 'active' : ''} onClick={() => this.props.setMode('search')} />
                    </div>
                    <SettingsIcon className={`settings ${buttonClass}`} onClick={this.handleClick} />
                </div>

                <div className={`sidebar ${buttonClass}`} style={{ maxHeight: this.state.viewportH }}>
                    <div className="sidebar-header">
                        <div className="sidebar-header-wrapper container">
                            <BackArrow onClick={this.handleClick} />
                            <span>Settings</span>
                        </div>
                    </div>

                    <div className="sidebar-body" style={{ height: this.state.viewportH - 42 }}>
                        <HeaderOptions />

                        <div className="sidebar-footer">
                            <div className="container">
                                <a className="git-icon" href="https://github.com/xandjiji/stardew-helper">
                                    <GithubIcon />
                                </a>
                                made by
                                <a className="git-profile" href="https://github.com/xandjiji">
                                    xandjiji
                                </a>
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
        mode: state.modeReducer.mode
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