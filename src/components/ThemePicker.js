import React, { Component } from 'react'
import { connect } from "react-redux";

import ThemeOption from './ThemeOption';

import '../css/themePicker.css';

import themes from '../jsons/themes.json';

import { setTheme } from '../utils';

export class ThemePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: this.props.active
        }

        this.notifyPick = this.notifyPick.bind(this);
    }

    notifyPick = (id) => {
        this.setState({ active: id });
        this.props.selectTheme(id);

        setTheme(themes, id);
    }

    render() {
        let themesElement =
            themes.map((item, index) =>
                <ThemeOption
                    theme={item}
                    id={index}
                    key={index}
                    currentlySelected={this.state.active}
                    notifyPick={this.notifyPick}
                />
            );



        return (
            <div className="theme-picker">
                {themesElement}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        active: state.themeReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        selectTheme: (id) => {
            dispatch({
                type: "SELECT_THEME",
                payload: id
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker);