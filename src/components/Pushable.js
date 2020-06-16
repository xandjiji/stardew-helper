import React, { Component } from 'react'

export class Pushable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            positionX: 0,
            index: 0
        }

        this.mainRef = React.createRef();

        this.dragStart = this.dragStart.bind(this);
        this.dragging = this.dragging.bind(this);
        this.dragStop = this.dragStop.bind(this);
        this.onOut = this.onOut.bind(this);

        this.handleTrigger = this.handleTrigger.bind(this);
    }

    dragStart(event) {
        if (event.button === 1 || event.button === 2) {
            return
        }

        this.mainRef.current.style.transition = "";
        this.mainRef.current.style.cursor = "grabbing";

        const { pageX } = (event.touches && event.touches[0]) || event;
        this.setState({
            isMousePressed: true,
            initialX: pageX,
            currentX: pageX
        })
    }

    dragging(event) {
        const { pageX } = (event.touches && event.touches[0]) || event;
        if (this.state.isMousePressed) {

            const { blockLeft, blockRight } = this.props;
            let delta = pageX - this.state.currentX;
            let newPositionX = this.state.positionX + delta;

            if (blockLeft && newPositionX < 0) {
                return
            }
            if (blockRight && newPositionX > 0) {
                return
            }

            this.setState({
                currentX: pageX,
                positionX: newPositionX
            })
        }
    }

    dragStop(event) {
        this.mainRef.current.style.cursor = "";

        this.setState({
            isMousePressed: false
        })

        const { pageX } = (event.changedTouches && event.changedTouches[0]) || event;
        let distance = this.state.initialX - pageX;

        const { blockLeft, blockRight } = this.props;
        if (blockLeft && distance > 0) {
            return
        }
        if(blockRight && distance < 0) {
            return
        }

        /* pushy enough */
        if (Math.abs(distance) > 80) {
            this.handleTrigger();
        }

        this.mainRef.current.style.transition = "transform 0.2s ease-out"
        this.setState({ positionX: 0 });
    }

    onOut(event) {
        if (this.state.isMousePressed) {
            const { pageX, pageY } = event;

            /* checking if mouse is out of the parent node */
            let parentBox = this.mainRef.current.parentNode.getBoundingClientRect();
            var { bottom, top, right, left } = parentBox;

            if (pageY >= bottom || pageY <= top || pageX >= right || pageX <= left) {
                this.dragStop(event);
            }

            /* checking if mouse is out of the element */
            let elementBox = this.mainRef.current.getBoundingClientRect();
            var { bottom, top, right, left } = elementBox;

            if (pageY >= bottom || pageY <= top || pageX >= right || pageX <= left) {
                this.dragStop(event);
            }
        }
    }

    handleTrigger() {
        const { trigger } = this.props;
        
        if(trigger) {
            trigger();
        }
    }

    render() {
        const { children, active } = this.props;

        return (
            <div
                ref={this.mainRef}
                className={`pushable-item ${active ? 'active' : ''}`}
                style={{ transform: `translateX(${this.state.positionX}px)` }}

                onMouseDown={this.dragStart}
                onMouseMove={this.dragging}
                onMouseUp={this.dragStop}

                onMouseOut={this.onOut}

                onTouchStart={this.dragStart}
                onTouchMove={this.dragging}
                onTouchEnd={this.dragStop}>

                {children}
            </div>
        )
    }
}

export default Pushable
