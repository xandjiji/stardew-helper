import React, { Component } from 'react'
import { connect } from "react-redux";

import { ReactComponent as SelectArrow } from '../assets/selectArrow.svg';

import { buildClassName } from '../utils';

import '../css/listView.css';

export class ListView extends Component {
    constructor(props) {
        super(props);

        const { list } = this.props;

        let initialList;
        if (Array.isArray(list)) {
            initialList = list[0]
        } else {
            initialList = list
        }

        this.state = {
            viewportH: window.innerHeight,
            currentList: initialList,
            selector: false
        }

        this.changeList = this.changeList.bind(this);
        this.toggleSelector = this.toggleSelector.bind(this);

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            const { list } = this.props;

            let currentList;
            if (Array.isArray(list)) {
                currentList = list[0]
            } else {
                currentList = list
            }
            this.setState({ currentList: currentList })
        }
    }

    handleResize() {
        this.setState({ viewportH: (window.innerHeight) });
    }

    preventScroll(event) {
        event.stopPropagation();
    }

    changeList(list) {
        this.setState({ currentList: list });
        this.toggleSelector();
    }

    toggleSelector() {
        this.setState({ selector: !this.state.selector });
    }

    makeInfo(item, layout) {

        let element;

        if (layout !== undefined) {

            const { stats, icon } = layout;
            if (stats === 'foodBuff') {

                if (item[stats] !== undefined) {
                    element =
                        <div className="item-info list">
                            {
                                item[stats].map((element, index) =>
                                    <div className={`item-info-item ${stats}`} key={index}>
                                        <div className={`buff-sprite ${buildClassName(element.buffName)}`}></div>
                                        <span className="stat-info">{element.buffName} ({element.buffQty})</span>
                                    </div>
                                )
                            }
                        </div>
                }

                return element

            } else if (stats === 'stats') {

                if (item[stats].buff !== undefined) {
                    element =
                        <div className="item-info list">
                            <div className={`item-info-item ${stats} ${item[stats].damage === undefined ? 'hide' : ''}`}>
                                <div className={`buff-sprite bg-Attack`}></div>
                                <span className="stat-info">{item[stats].damage} damage</span>
                            </div>
                            {
                                item[stats].buff.map((element, index) =>
                                    <div className={`item-info-item ${stats}`} key={index}>
                                        <div className={`buff-sprite ${buildClassName(element.stat)}`}></div>
                                        <span className="stat-info">{element.stat} ({element.val})</span>
                                    </div>
                                )
                            }
                        </div>
                } else {
                    element =
                        <div className="item-info list">
                            <div className={`item-info-item ${stats}`}>
                                <div className={`buff-sprite bg-Attack`}></div>
                                <span className="stat-info">{item[stats].damage} damage</span>
                            </div>

                        </div>
                }

                return element
            }


            let appendText = '';
            if (stats === 'profitability') {
                appendText = 'g/day';
            } else if (stats === 'sellPrice') {
                appendText = 'g';
            }

            element =
                <div className={`item-info ${stats}`}>
                    <div className={`item-sprite ${icon}`}></div>
                    {item[stats]}{appendText}
                </div>
        }

        return element;
    }

    render() {
        const { icon, title } = this.props;
        const listProp = this.props.list;
        const { list, layout } = this.state.currentList;

        let sortElement;
        if (Array.isArray(listProp)) {
            sortElement =
                <div className={`selector ${this.state.selector ? 'active' : ''}`} onClick={() => this.toggleSelector()}>
                    <div className="selected-option">
                        <span>Filter</span>
                        {this.state.currentList.name}
                        <SelectArrow />
                    </div>

                    <div className="options-wrapper">
                        {
                            listProp.map((element, index) =>
                                <div className="option-item" key={index} onClick={() => this.changeList(element)}>
                                    {element.name}
                                </div>
                            )
                        }
                    </div>

                    <div className={`backdrop ${this.state.selector ? 'active' : ''}`} onClick={() => this.toggleSelector()}></div>
                </div>
        }

        return (
            <div className="list-wrapper material">
                <div className="list-head">
                    <div className="list-name">
                        <div className="icon-frame">
                            <div className={buildClassName(icon)}></div>
                        </div>
                        {title}
                    </div>

                    {sortElement}
                </div>

                <div
                    className={`list custom-scrollbar ${layout === undefined ? 'grid' : ''}`}
                    style={{ maxHeight: this.state.viewportH - 208 }}
                    onWheel={this.preventScroll}>
                    {
                        list.map((element, index) =>
                            <div className="list-item" key={index}>
                                <div className="item-name" onClick={() => this.props.openModal(element.id)}>
                                    <div className={`sprite ${buildClassName(element.name)}`}></div>
                                    <span>{element.name}</span>
                                </div>

                                {this.makeInfo(element, layout)}
                            </div>
                        )
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListView);