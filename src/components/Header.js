import React, { Component } from 'react'
import { connect } from "react-redux";
import throttle from "lodash.throttle";

import HeaderOptions from './HeaderOptions';
import Pushable from './Pushable';
import DotsPicker from './DotsPicker';
import CatPicker from './CatPicker';

import '../css/header.css';

import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as BundleIcon } from '../assets/present.svg';
import { ReactComponent as DotsIcon } from '../assets/dots.svg';
import { ReactComponent as CalendarIcon } from '../assets/calendar.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as BooksIcon } from '../assets/books.svg';
import { ReactComponent as BackArrow } from '../assets/arrow.svg';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: false,
            catActive: false,
            dotsActive: false,
            viewportH: window.innerHeight
        }

        this.notifyClose = this.notifyClose.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleClickBackdrop = this.handleClickBackdrop.bind(this);
        this.handleClickDots = this.handleClickDots.bind(this);
        this.handleClickCat = this.handleClickCat.bind(this);
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

    handleClickBackdrop() {
        this.setState({ menuActive: false });
    }

    handleClickCat() {
        this.setState({ catActive: !this.state.catActive });
    }

    handleClickDots() {
        this.setState({ dotsActive: !this.state.dotsActive });
    }

    handleKeyDown = throttle((event) => {
        if (event.key === 'Escape') {            
            this.setState({ menuActive: false });
        }
    }, 400);

    handleResize = throttle(() => {
        this.setState({ viewportH: window.innerHeight });
    }, 400);

    notifyCloseDots = () => {
        this.setState({ dotsActive: false });
    }

    notifyClose = () => {
        this.setState({ catActive: false });
    }

    render() {
        const { mode } = this.props;

        let categories = ['crops', 'animalProducts', 'artisanGoods', 'fishes', 'minerals', 'artifacts', 'weapons', 'equipment', 'dishes', 'furnitures', 'animals', 'villagers' ];
        let pickerActive = false;
        if (categories.includes(mode)) {
            pickerActive = true;
        }

        let bundleActive = false;
        if (mode === 'bundle' || mode === 'season') {
            bundleActive = true;
        }

        let buttonClass = '';
        if (this.state.menuActive) {
            buttonClass = 'active';
        }

        return (
            <div className="header-bar">
                <div className="settings-button container">
                    <div className="modes-wrapper">
                        <div className={`modes-wrapper bundle-tray ${bundleActive ? 'active' : ''}`}>
                            <BundleIcon className={bundleActive ? 'active' : ''} onClick={() => this.props.setMode('bundle')} />
                            <DotsIcon className={`dots-icon smooth ${this.state.dotsActive ? 'active' : ''}`} onClick={this.handleClickDots} />
                        </div>
                        <BooksIcon className={this.state.catActive || pickerActive ? 'active' : ''} onClick={this.handleClickCat} />
                        <CalendarIcon className={mode === 'calendar' ? 'active' : ''} onClick={() => this.props.setMode('calendar')} />
                        <SearchIcon className={mode === 'search' ? 'active' : ''} onClick={() => this.props.setMode('search')} />
                    </div>
                    <SettingsIcon className={`settings ${buttonClass}`} onClick={this.handleClick} />
                </div>

                <Pushable trigger={this.handleClick} active={this.state.menuActive} blockRight={true}>
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
                    <div className={`backdrop ${buttonClass}`} onClick={this.handleClickBackdrop}></div>
                </Pushable>

                <DotsPicker isActive={this.state.dotsActive} notifyClose={this.notifyCloseDots} />
                <CatPicker isActive={this.state.catActive} notifyClose={this.notifyClose} />
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