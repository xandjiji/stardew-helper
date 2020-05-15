import React, { Component } from 'react'

import '../css/carousel.css';

export class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            positionX: 0,
            index: 0
        }

        this.mainRef = React.createRef();
        this.sliderRef = React.createRef();

        this.dragStart = this.dragStart.bind(this);
        this.dragging = this.dragging.bind(this);
        this.dragStop = this.dragStop.bind(this);
        this.onWheel = this.onWheel.bind(this);
    }

    componentDidUpdate(prevProps) {
        this.resetPosition(prevProps)
    }

    UNSAFE_componentWillUpdate(prevProps) {
        this.resetPosition(prevProps)
    }

    resetPosition(prevProps) {
        const { currentRoom } = this.props;

        if (currentRoom && (currentRoom !== prevProps.currentRoom)) {
            this.setIndex(0);
        }
    }

    dragStart(event) {
        this.sliderRef.current.style.transition = "";
        this.sliderRef.current.style.cursor = "grabbing";

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
            this.setState({
                currentX: pageX,
                positionX: this.state.positionX + (pageX - this.state.currentX),
            })
        }
    }

    dragStop(event) {
        if (this.state.isMousePressed) {
            this.sliderRef.current.style.cursor = "";

            this.setState({
                isMousePressed: false
            })

            const { pageX } = (event.changedTouches && event.changedTouches[0]) || event;
            let distance = this.state.initialX - pageX;
            let elementSize = this.mainRef.current.offsetWidth;

            /* pushy enough */
            if (Math.abs(distance) > 120) {
                let newIndex = this.state.index + ((Math.sign(distance)));

                this.setIndex(newIndex);
            } else {
                this.sliderRef.current.style.transition = "transform 0.2s ease-out"
                this.setState({ positionX: elementSize * this.state.index * - 1 });
            }
        }
    }

    onWheel(event) {
        const { deltaY } = event;

        let newIndex;
        if (deltaY > 0) {
            newIndex = this.state.index + 1;
        } else {
            newIndex = this.state.index - 1;
        }

        this.setIndex(newIndex);
    }

    setIndex(newIndex) {
        let childrenCount = this.props.children.length || 1;
        let elementSize = this.mainRef.current.offsetWidth;

        this.sliderRef.current.style.transition = "transform 0.2s ease-out"

        if (newIndex >= 0 && newIndex < childrenCount) {
            this.setState({
                index: newIndex,
                positionX: elementSize * newIndex * - 1
            });

            if (this.props.updateState) {
                this.props.updateState(newIndex);
            }

        } else {
            this.setState({ positionX: elementSize * this.state.index * - 1 });
        }
    }

    render() {
        return (
            <div ref={this.mainRef} className="carousel-wrapper"

                onMouseDown={this.dragStart}
                onMouseMove={this.dragging}
                onMouseUp={this.dragStop}
                onMouseOut={this.dragStop}
                onWheel={this.onWheel}

                onTouchStart={this.dragStart}
                onTouchMove={this.dragging}
                onTouchEnd={this.dragStop}
            >

                <div ref={this.sliderRef} className="item-wrapper" style={{ transform: `translateX(${this.state.positionX}px)` }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Carousel
