import React, { Component } from 'react'

export class ThemeOption extends Component {
    constructor(props) {
        super(props);

        const { id, currentlySelected } = this.props;

        let isActive = (currentlySelected == id)

        this.state = {
            active: isActive
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {

        const { active } = this.state;

        if (active) {
            const { id, currentlySelected } = this.props;

            if (prevProps.currentlySelected !== currentlySelected) {
                if (id !== currentlySelected) {
                    if (active) {
                        this.setState({ active: false });
                    }
                }
            }
        }
    }

    handleClick() {
        this.setState({ active: true });
        this.props.notifyPick(this.props.id);
    }

    render() {
        const { name, surface, onSurface, primary, separator } = this.props.theme;

        return (
            <div
                className="theme-item"
                style={{ backgroundColor: surface, color: onSurface, borderColor: separator }}
                onClick={this.handleClick}>

                <div className="primary-block" style={{ backgroundColor: primary, borderColor: separator }}></div>

                {name}
            </div>
        )
    }
}

export default ThemeOption
