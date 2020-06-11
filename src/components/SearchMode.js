import React, { Component } from 'react'
import { connect } from "react-redux";

import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

import { buildClassName } from '../utils';

import itemsData from '../jsons/items.json';

import '../css/search.css';

export class SearchMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewportH: window.innerHeight,
            query: '',
            resultBag: []
        }

        this.inputRef = React.createRef();

        this.fetchItems = this.fetchItems.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleButton = this.handleButton.bind(this);

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({ viewportH: (window.innerHeight) });
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
        this.fetchItems(event.target.value);
    }

    handleKey(event) {
        if(event.keyCode === 13) {
            this.inputRef.current.blur()
        }
    }

    handleClick() {
        this.setState({ query: '', resultBag: [] });
        this.inputRef.current.focus()
    }

    handleButton() {
        this.inputRef.current.blur()
    }

    fetchItems(queryString) {

        if (queryString !== '') {

            queryString = escapeRegex(queryString);
            let results = [];
            let regex = new RegExp(queryString, 'gi');

            itemsData.forEach(element => {
                if (regex.test(element.name)) {
                    results.push(element);
                }
            })
            this.setState({ resultBag: results });
        } else {
            this.setState({ resultBag: [] });
        }
    }

    render() {
        const { length } = this.state.resultBag;
        let dynamicStyle = { maxHeight: 0 }

        if (length > 0) {
            dynamicStyle = { maxHeight: this.state.viewportH - 192 }
        }

        return (
            <div className="search-wrapper material">
                <div className="search-head">
                    <input
                        ref={this.inputRef}
                        className="search-input smooth"
                        placeholder="Search"
                        value={this.state.query}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKey}
                        autoFocus={true}
                    />

                    <CloseIcon className={`reset-button smooth ${this.state.query === '' ? '' : 'active'}`} onClick={this.handleClick} />
                    <SearchIcon className="search-icon smooth" onClick={this.handleButton} />
                </div>

                <span className={`results-text ${length > 0 ? 'active' : ''}`}>{length} results found</span>

                <div className="search-results custom-scrollbar smooth" style={dynamicStyle}>
                    {
                        this.state.resultBag.map((element, index) =>
                            <div
                                className={`${buildClassName(element.name)} result-item`}
                                key={index}
                                onClick={() => this.props.openModal(element.id)}>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchMode);