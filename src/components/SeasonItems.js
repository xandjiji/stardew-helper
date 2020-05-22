import React, { Component } from 'react'
import { connect } from 'react-redux'

import Item from './Item';

import '../css/seasonItems.css';
import '../css/skills.css';

import themes from '../themes.json';

export class SeasonItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFilter: undefined
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {

            const { items } = this.props;
            const { currentFilter } = this.state;

            if (items[currentFilter] === undefined) {
                this.setState({ currentFilter: undefined });
            }
        }
    }

    filterBy(skill) {
        if (skill === this.state.currentFilter) {
            this.setState({ currentFilter: undefined })
        } else {
            this.setState({ currentFilter: skill })
        }
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        const { items } = this.props;

        let itemElement = [];
        let skillElement = [];
        for (const skill of Object.keys(items)) {

            /* skills */
            const { currentFilter } = this.state;

            let isActive = (currentFilter === undefined || currentFilter === skill);

            skillElement.push(
                <div className={`skill-item bg-${skill} ${isActive ? 'active' : ''}`} key={skill} onClick={() => this.filterBy(skill)}></div>
            );


            /* items */
            if (currentFilter === undefined || currentFilter === skill) {
                items[skill].forEach(element => {
                    itemElement.push(<Item item={element} key={element.id} />);
                });
            }
        }


        return (
            <div className="bundle-item material" style={{ backgroundColor: palette.surface, color: palette.onSurface }}>
                <div className="skill-filter" style={{ borderBottomColor: palette.separator }}>
                    {skillElement}
                </div>

                <div className="bundle-items-wrapper custom-scrollbar">
                    {itemElement}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    themeId: state.themeReducer
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonItems)
