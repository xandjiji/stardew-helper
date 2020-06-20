import React, { Component } from 'react'

import '../css/calendar.css';

import calendar from '../jsons/calendar.json';
import npcs from '../jsons/npcs.json';

export class CalendarMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSeason: 'Spring',
            currentDay: 4,
            eventType: 'Birthday'
        }

        this.handleClickSeason = this.handleClickSeason.bind(this);
        this.handleClickDay = this.handleClickDay.bind(this);
    }

    handleClickSeason(month) {
        this.setState({ currentSeason: month }, () => { this.setFirstEvent(month) });
    }

    handleClickDay(currentDay) {

        currentDay = parseInt(currentDay);
        
        let monthData = calendar[this.state.currentSeason];

        if (monthData[currentDay] === undefined) {
            return
        }

        let eventType = 'Event';
        if (Number.isInteger(monthData[currentDay])) {
            eventType = 'Birthday';
        }

        this.setState({ currentDay, eventType });
    }

    makeNpcAction(id) {
        return <span className="npc-action">{npcs[id]}</span>
    }

    setFirstEvent(season) {
        for (const event of Object.keys(calendar[season])) {            
            this.handleClickDay(event)
            break;
        }
    }

    render() {

        const { currentSeason, currentDay, eventType } = this.state;

        let monthsElement = [];
        for (const month of Object.keys(calendar)) {
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

        let currentSeasonData = calendar[currentSeason];
        let daysElement = [];
        for (let i = 1; i < 29; i++) {

            let currentDayData = currentSeasonData[i];
            let contentElement;
            let dayClass = '';
            if (currentDayData !== undefined) {
                dayClass = 'event';
                if (Number.isInteger(currentDayData)) {
                    contentElement =
                        <div className={`bg-${npcs[currentSeasonData[i]]}`}></div>
                } else {
                    contentElement =
                        <div className="bg-Event"></div>
                }
            }

            daysElement.push(
                <div
                    className={`day-item ${dayClass} ${currentDay === i ? 'active' : ''}`}
                    key={i}
                    onClick={() => this.handleClickDay(i)}>
                    <span className="day-number">{i}</span>

                    {contentElement}
                </div>
            )
        }


        let infoIconClass;
        let innerInfoElement;
        let currentDayData = calendar[currentSeason][currentDay];
        if (Number.isInteger(currentDayData)) {
            infoIconClass = `bg-${npcs[currentDayData]}`

            innerInfoElement = this.makeNpcAction(currentDayData)
        } else {
            infoIconClass = 'bg-Event';

            innerInfoElement = <span className="inner-info">{currentDayData}</span>
        }

        return (
            <div className="calendar-mode-wrapper">
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

                <div className="calendar-info material">
                    <div className="info-icon">
                        <div className={infoIconClass}></div>
                    </div>

                    <div className="event-wrapper">{eventType}: {innerInfoElement}</div>
                </div>
            </div>
        )
    }
}

export default CalendarMode
