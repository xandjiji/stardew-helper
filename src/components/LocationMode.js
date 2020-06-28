import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/locationMode.css';

import scheduleData from '../jsons/schedules.json';

export class LocationMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSeason: 'Spring',
            currentDay: undefined,
            currentNpc: 'Abigail',
            currentNpcId: npcId.Abigail
        }

        this.handleClickSeason = this.handleClickSeason.bind(this);
        this.handleClickDay = this.handleClickDay.bind(this);
        this.handleClickNpc = this.handleClickNpc.bind(this);
    }

    handleClickSeason(month) {
        this.setState({ currentSeason: month }, () => { this.handleClickDay() });
    }

    handleClickDay(currentDay) {
        this.setState({ currentDay });
    }

    handleClickNpc(name) {
        this.setState({ currentNpc: name });
    }

    render() {

        const { currentSeason, currentDay, currentNpc } = this.state;

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

        let npcsElement = [];
        for (const npc of Object.keys(scheduleData)) {
            npcsElement.push(
                <div className={`bg-${npc}`} onClick={() => this.handleClickNpc(npc)} key={npc}></div>
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

                <div className="npc-picker material">
                    <div className="current-npc">
                        <div className="portrait-wrapper">
                            <div className={`bg-${currentNpc}`}></div>
                        </div>
                        <span className="npc-action" onClick={() => this.props.openModal(npcId[currentNpc])}>
                            {currentNpc}
                        </span>
                    </div>

                    <div className="npc-list custom-scrollbar">
                        {npcsElement}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        openModal: (id) => {
            dispatch({
                type: "OPEN_MODAL",
                payload: id
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationMode);

const npcId = {
    Abigail: 982,
    Alex: 983,
    Caroline: 984,
    Clint: 985,
    Demetrius: 986,
    Elliott: 988,
    Emily: 989,
    Evelyn: 990,
    George: 991,
    Gus: 992,
    Haley: 993,
    Harvey: 994,
    Jas: 995,
    Jodi: 996,
    Kent: 997,
    Leah: 999,
    Lewis: 1000,
    Linus: 1001,
    Marnie: 1002,
    Maru: 1003,
    Pam: 1004,
    Penny: 1005,
    Pierre: 1006,
    Robin: 1007,
    Sam: 1008,
    Sebastian: 1010,
    Shane: 1011,
    Vincent: 1012,
    Willy: 1013,
}
