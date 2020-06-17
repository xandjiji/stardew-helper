import React, { Component } from 'react'
import { connect } from "react-redux";
import throttle from "lodash.throttle";

import '../css/dotsPicker.css';

export class DotsPicker extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleClick(mode) {
        this.props.notifyClose();
        this.props.setMode(mode);
    }

    handleKeyDown = throttle((event) => {
        if (event.key === 'Escape') {
            this.props.notifyClose()
        }
    }, 400);

    render() {
        const { notifyClose, mode } = this.props;

        return (
            <div className="dots-picker-wrapper">
                <div className={`cat-picker ${this.props.isActive ? 'active' : ''}`}>
                    <div className={`radio-option ${mode === 'bundle'}`} onClick={() => this.handleClick('bundle')}>Bundle Mode</div>
                    <div className={`radio-option ${mode === 'season'}`} onClick={() => this.handleClick('season')}>Season Mode</div>
                </div>

                <div className={`cat-backdrop ${this.props.isActive ? 'active' : ''}`} onClick={() => notifyClose()}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.modeReducer.bundleMode
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setMode: (mode) => {
            dispatch({
                type: "SET_BUNDLE_MODE",
                payload: mode
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DotsPicker);