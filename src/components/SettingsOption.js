import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/settingsOption.css';
import themes from '../jsons/themes.json';

import { ReactComponent as SmallArrow } from '../assets/small-arrow.svg';

export class SettingsOption extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {

        const { active } = this.state;

        if(active) {
            const { currentlyOpen, title } = this.props;

            if (prevProps.currentlyOpen !== currentlyOpen) {

                if (title !== currentlyOpen) {
                    if (active) {
                        this.setState({ active: false });
                    }
                }
            }
        }
    }

    handleClick() {
        this.setState({ active: !this.state.active });
        this.props.notifyOpen(this.props.title);
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        let buttonClass = '';
        if (this.state.active) {
            buttonClass = 'active';
        }

        const { children } = this.props;

        let optionIcon;
        let optionContent;
        if (Array.isArray(children)) {
            optionIcon = children[0];
            optionContent = children[1];
        } else {
            optionContent = children;
        }


        return (
            <div className={`option-wrapper ${buttonClass}`}>
                <div
                    className="option-head inner-container"
                    onClick={this.handleClick}
                    style={{ backgroundColor: palette.surface, borderBottomColor: palette.separator }}>

                    <span className="option-name">{optionIcon}{this.props.title}</span>
                    <SmallArrow className="option-arrow" />
                </div>

                <div className="option-content inner-container">
                    {optionContent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return { themeId: state.themeReducer };
};

function mapDispatchToProps(dispatch) {
    return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(SettingsOption);