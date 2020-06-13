import React, { Component } from 'react'
import { connect } from "react-redux";

import { buildClassName } from '../utils';

import '../css/catItem.css';

export class CatItem extends Component {
    constructor(props) {
        super(props);

        const { currentMode, mode } = this.props

        let isActive = false;
        if (currentMode === mode) {
            isActive = true;
        }

        this.state = {
            active: isActive
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ active: true })
        this.props.close();        
    }

    render() {
        return (
            <div className="cat-item" onClick={this.handleClick}>
                <div className="cat-icon-wrapper smooth">
                    <div className={`cat-icon ${buildClassName(this.props.icon)}`}></div>
                </div>
                <span className="cat-name">{this.props.name}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        currentMode: state.modeReducer.mode
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

export default connect(mapStateToProps, mapDispatchToProps)(CatItem);