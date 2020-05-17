import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/deleteAllData.css'

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

        let clearClass = '';
        if(!this.state.allowed) {
            clearClass += ' animate';
        }

        return (
            <div className="delete-data-button">
                <button onClick={this.handleClick}>
                    Reset
                    <span className={`textFloat ${clearClass}`}>clear!</span>
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
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
