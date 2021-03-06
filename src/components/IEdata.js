import React, { Component } from 'react'
import { connect } from "react-redux";
import throttle from "lodash.throttle";

import '../css/IEdata.css';

import { ReactComponent as CopyIcon } from '../assets/copy.svg';
import { ReactComponent as ConfirmedIcon } from '../assets/confirmed.svg';
import { ReactComponent as ImportIcon } from '../assets/import.svg';


export class IEdata extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.base64State,
            importStatus: undefined
        }

        this.inputRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.copyClipboard = this.copyClipboard.bind(this);
        this.importData = this.importData.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { base64State } = this.props;

        if (prevProps.base64State !== base64State) {
            this.setState({
                value: base64State,
                importStatus: undefined
            });
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
            importStatus: undefined,
            copyStatus: undefined
        });
    }

    handleKeyDown = throttle((event) => {
        if (event.key === 'Enter') {
            this.importData();
        }
    }, 400);

    copyClipboard() {
        this.inputRef.current.select();
        document.execCommand('copy');
        this.setState({ copyStatus: true });
    }

    importData() {
        const { value } = this.inputRef.current;

        if (value === 'allitems' || value === 'zeroitems') {
            return this.cheatCode(value);
        }

        let itemData;
        try {
            itemData = JSON.parse(atob(value));

        } catch (event) {
            this.setState({ importStatus: false });
            return;
        }

        this.props.updateAllItems(itemData);
        this.setState({ importStatus: true });

    }

    cheatCode(code) {
        let itemData = {};
        if (code === 'allitems') {
            for (let i = 0; i <= 134; i++) {
                itemData[i] = true;
            }
        }

        this.props.updateAllItems(itemData);
        this.setState({ importStatus: true });
    }

    render() {
        let shakeAnimation = '';
        let importClass = '';
        if (this.state.importStatus === false) {
            shakeAnimation = 'animated headShake';
            importClass = 'fail';
        } else if (this.state.importStatus === true) {
            shakeAnimation = 'animated tada';
            importClass = 'success';
        }

        let copyClass = '';
        let rollAnimation = '';
        if (this.state.copyStatus) {
            copyClass = 'success';
            rollAnimation = 'rollIn';
        }


        return (
            <div className={`data-wrapper inner-container ${shakeAnimation}`}>
                <div className="input-wrapper">
                    <input
                        ref={this.inputRef}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown} />
                </div>

                <div className="buttons-wrapper">
                    <div className={`data-button ${copyClass}`} onClick={this.copyClipboard}>
                        <CopyIcon className="copy-icon" />
                        <ConfirmedIcon className={`animated confirmed ${rollAnimation}`} />
                    </div>
                    <div className={`data-button ${importClass}`} onClick={this.importData}>
                        <ImportIcon />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { itemReducer } = state;
    let base64State = JSON.stringify(itemReducer);
    base64State = btoa(base64State);

    return {
        base64State
    };
};

function mapDispatchToProps(dispatch) {
    return {
        updateAllItems: (items) => {
            dispatch({
                type: "UPDATE_ALL_ITEMS",
                payload: items
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IEdata);