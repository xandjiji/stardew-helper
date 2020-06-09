import React, { Component } from 'react'

import Item from './Item';

import '../css/seasonItems.css';
import '../css/skills.css';

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

    preventScroll(event) {
        event.stopPropagation();
    }

    render() {
        const { items } = this.props;

        let itemElement = [];
        let skillElement = [];
        for (const skill of Object.keys(items)) {

            /* skills */
            const { currentFilter } = this.state;

            let isActive = (currentFilter === undefined || currentFilter === skill);

            skillElement.push(
                <div className={`skill-item skill-icon bg-${skill} ${isActive ? 'active' : ''}`} key={skill} onClick={() => this.filterBy(skill)}></div>
            );


            /* items */
            if (currentFilter === undefined || currentFilter === skill) {
                items[skill].forEach(element => {
                    itemElement.push(<Item item={element} key={element.id} />);
                });
            }
        }


        return (
            <div className="bundle-item">
                <div className="skill-filter">
                    {skillElement}
                </div>

                <div className="bundle-items-wrapper custom-scrollbar"
                    onWheel={this.preventScroll}
                    onTouchMove={this.preventScroll}
                >
                    {itemElement}
                </div>
            </div>
        )
    }
}

export default SeasonItems
