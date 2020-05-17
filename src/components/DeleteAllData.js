import React, { Component } from 'react'

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

export default DeleteAllData

