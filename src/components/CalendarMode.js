import React, { Component } from 'react'

import '../css/calendarMode.css';

import Calendar from './Calendar';

export class CalendarMode extends Component {
    render() {
        return (
            <div className="calendar-mode-wrapper">
                <Calendar />
            </div>
        )
    }
}

export default CalendarMode
