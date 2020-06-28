import React, { Component } from 'react'
import { connect } from "react-redux";

import Carousel from '../components/Carousel';

import '../css/locationMode.css';
import '../css/locations.css';

import scheduleData from '../jsons/schedules.json';
import scheduleDictionary from '../jsons/schedule_dict.json';

const weekdayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export class LocationMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSeason: 'Spring',
            currentWeekday: 'Mon',
            currentDay: 6,
            currentNpc: 'Abigail',

            currentNpcId: npcId.Abigail,

            currentSchedule: scheduleData.Abigail.schedules[0].schedule,

            currentLocation: 'SeedShop',
            currentLocationX: 39,
            currentLocationY: 5,

            currentMarriage: undefined,
            rain: false,
            community_restored: false,
            beach_bridge: false,
            bus_restored: false,
            abigail_6: false,
            alex_6: false,
            haley_6: false,
            leah_6: false,
            penny_6: false,
            sam_6: false,
            sebastian_6: false
        }

        this.viewRef = React.createRef();

        this.handleClickSeason = this.handleClickSeason.bind(this);
        this.handleClickDay = this.handleClickDay.bind(this);
        this.handleClickNpc = this.handleClickNpc.bind(this);
        this.handleToggleKey = this.handleToggleKey.bind(this);

        this.findCurrentSchedule = this.findCurrentSchedule.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
    }

    componentDidMount() {
        this.selectLocation('SeedShop 39 5');
    }

    handleClickSeason(month) {
        this.setState({ currentSeason: month }, () => { this.findCurrentSchedule() });
    }

    handleClickDay(currentDay) {
        this.setState({
            currentDay,
            currentWeekday: weekdayName[(currentDay - 1) % 7]
        }, () => { this.findCurrentSchedule() });
    }

    handleClickNpc(name) {
        this.setState({ currentNpc: name }, () => { this.findCurrentSchedule() });
    }

    handleToggleKey(key) {
        const { currentNpc, currentMarriage } = this.state;

        if (key === 'currentMarriage') {
            if (currentNpc === currentMarriage) {
                return this.setState({ [key]: undefined }, () => { this.findCurrentSchedule() });
            } else {
                return this.setState({ [key]: this.state.currentNpc }, () => { this.findCurrentSchedule() });
            }
        } else {
            this.setState({ [key]: !this.state[key] }, () => { this.findCurrentSchedule() });
        }
    }

    findCurrentSchedule() {
        const { currentNpc } = this.state;

        let scheduleList = scheduleData[currentNpc].schedules;

        for (let index in scheduleList) {
            /* console.log('');
            console.log(`-->Searching schedule item [${index}] of ${currentNpc}`); */

            let scheduleItem = scheduleList[index];

            let { conditions, schedule } = scheduleItem;

            let found = true;
            for (const condition in conditions) {
                /* console.log(`Searching condition item [${condition}]`); */
                let conditionItem = conditions[condition]
                /* console.log(conditionItem); */

                if (this.state[condition] !== conditionItem) {
                    found = false;
                    break
                }
            }

            if (found) {
                /* console.log('-------- achou'); */
                /* console.log(scheduleItem); */

                return this.setState({ currentSchedule: schedule });
            }
        }
    }

    selectLocation(location) {
        location = location.split(' ');

        let { offsetWidth, offsetHeight } = this.viewRef.current

        offsetWidth = (offsetWidth / 2) - 9
        offsetHeight = (offsetHeight / 2) - 9

        const offsetX = (parseInt(location[1]) * -1) * 16;
        const offsetY = (parseInt(location[2]) * -1) * 16;
        this.setState({
            currentLocation: location[0],
            currentLocationX: offsetWidth + offsetX,
            currentLocationY: offsetHeight + offsetY
        })
    }

    render() {
        const {
            currentSeason,
            currentDay,
            currentNpc,
            currentSchedule,
            currentLocation,
            currentLocationX,
            currentLocationY
        } = this.state;

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

        let scheduleList = [];
        currentSchedule.forEach((element, index) => {
            const { time, location } = element;
            scheduleList.push(
                <div className="schedule-item" key={index} onClick={() => this.selectLocation(location)}>
                    <span className="time">{formatTime(time)}</span>
                    <span className="location">{scheduleDictionary[currentNpc][location]}</span>
                </div>
            )
        })

        let keysElement = [];
        const { specialConditions } = scheduleData[currentNpc]
        specialConditions.forEach((element, index) => {
            const { name, key } = element;
            keysElement.push(
                <div key={index}>
                    <span>{name} </span>
                    <span onClick={() => this.handleToggleKey(key)}>{`TOGGLE ----> ${this.state[key]}`}</span>
                </div>
            );
        })


        return (
            <div className="location-mode-wrapper">
                <Carousel>
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

                    <div className="location-viewer-wrapper material">
                        <div
                            className={`location-viewport ${currentLocation}`}
                            style={{ backgroundPositionX: currentLocationX, backgroundPositionY: currentLocationY }}
                            ref={this.viewRef}>

                        </div>
                    </div>
                </Carousel>

                <Carousel>
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



                        <div>
                            {keysElement}
                        </div>
                    </div>

                    <div className="schedules-wrapper material">
                        {scheduleList}
                    </div>
                </Carousel>
            </div>
        )
    }
}

function formatTime(time) {
    time = time.toString();
    time = time.split('');

    let minutes = time.splice(time.length - 2, time.length - 1);
    minutes = minutes.join('');

    let hours = time.join('');
    if (hours > 23) {
        hours -= 24;
    }

    return `${hours}:${minutes}`
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
