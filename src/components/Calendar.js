import React, { Component } from 'react'

import '../css/calendar.css';

import calendar from '../jsons/calendar.json';
import npcs from '../jsons/npcs.json';

export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSeason: 'Spring'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(month) {
        this.setState({ currentSeason: month })
    }

    render() {

        const { currentSeason } = this.state;

        let monthsElement = [];
        for (const month of Object.keys(calendar)) {
            monthsElement.push(
                <div
                    className={`season-item ${currentSeason === month ? 'active' : ''}`}
                    key={month}
                    onClick={() => this.handleClick(month)}>
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

        let currentSeasonData = calendar[currentSeason];
        let daysElement = [];
        for (let i = 1; i < 29; i++) {

            let currentDayData = currentSeasonData[i];
            let contentElement;
            let dayClass;
            if(currentDayData !== undefined) {
                dayClass = 'event';
                if(Number.isInteger(currentDayData)) {
                    contentElement =
                    <div className={`bg-${npcs[currentSeasonData[i]]}`}></div>
                } else {
                    contentElement =
                    <div className="bg-Event"></div>
                }
            }

            daysElement.push(
                <div className={`day-item ${dayClass}`} key={i}>
                    <span className="day-number">{i}</span>

                    {contentElement}
                </div>
            )            
        }

        


        return (
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
        )
    }
}

export default Calendar
