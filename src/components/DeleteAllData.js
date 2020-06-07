import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/deleteAllData.css'

import themes from '../jsons/themes.json';

export class DeleteAllData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowed: true
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.allowed) {

            this.props.resetAllItems();

            this.setState({ allowed: false },
                () => {
                    setTimeout(() => {
                        this.setState({ allowed: true })
                    }, 3000);
                }
            );
        }
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        let clearClass = '';
        if (!this.state.allowed) {
            clearClass += ' animate';
        }

        return (
            <div className="delete-data-button">
                <button onClick={this.handleClick}>
                    Reset
                    <span className={`textFloat ${clearClass}`} style={{ color: palette.onSurface }}>clear!</span>
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { themeId: state.themeReducer };
};

function mapDispatchToProps(dispatch) {
    return {
        resetAllItems: () => {
            dispatch({
                type: "RESET_ALL"
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAllData);
