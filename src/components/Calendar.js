import React, { Component } from 'react'

import calendar from '../jsons/calendar.json';

export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            season: 'Spring'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(month) {
        this.setState({ season: month })
    }

    render() {

        let monthsElement = [];
        for (const month of Object.keys(calendar)) {
            monthsElement.push(
                <div
                    className={`season-item ${this.state.season === month ? 'active' : ''}`}
                    key={month}
                    onClick={() => this.handleClick(month)}>
                        {month}
                </div>
            )
        }

        return (
            <div className="calendar-wrapper">
                <div className="season-picker">
                    {monthsElement}
                </div>
            </div>
        )
    }
}

export default Calendar
