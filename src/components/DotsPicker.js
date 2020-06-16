import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/dotsPicker.css';

export class DotsPicker extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(mode) {
        this.props.notifyClose();
        this.props.setMode(mode);
    }

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