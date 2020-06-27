import React, { Component } from 'react'

import '../css/locationMode.css';

export class LocationMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSeason: 'Spring',
            currentDay: undefined
        }

        this.handleClickSeason = this.handleClickSeason.bind(this);
        this.handleClickDay = this.handleClickDay.bind(this);
    }

    handleClickSeason(month) {
        this.setState({ currentSeason: month }, () => { this.handleClickDay() });
    }

    handleClickDay(currentDay) {
        this.setState({ currentDay });
    }

    render() {

        const { currentSeason, currentDay } = this.state;

        let seasonArray = ['Spring', 'Summer', 'Fall', 'Winter'];
        let monthsElement = [];
        for (const month of seasonArray) {
            monthsElement.push(
                <div
                    className={`season-item ${currentSeason === month ? 'active' : ''}`}
                    key={month}
                    onClick={() => this.handleClickSeason(month)}>
                    {month}
                </div>
            )
        }

        let weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        let weekdaysElement = [];
        let weekCount = 0;
        for (const weekday of weekdays) {
            weekdaysElement.push(
                <div className="weekday" key={weekCount}>{weekday}</div>
            )
            weekCount++;
        }

        let daysElement = [];
        for (let i = 1; i < 29; i++) {
            daysElement.push(
                <div
                    className={`day-item ${currentDay === i ? 'active' : ''}`}
                    key={i}
                    onClick={() => this.handleClickDay(i)}>
                    <span className="day-number">{i}</span>
                </div>
            )
        }


        return (
            <div className="location-mode-wrapper">
                <div className="calendar-wrapper">
                    <div className="season-picker">
                        {monthsElement}
                    </div>

                    <div className="weekdays-wrapper">
                        {weekdaysElement}
                    </div>

                    <div className="days-wrapper">
                        {daysElement}
                    </div>
                </div>
            </div>
        )
    }
}

export default LocationMode
