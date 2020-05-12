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
        this.mouseDrop = this.mouseDrop.bind(this);
    }

    componentDidMount() {
        this.mainRef.current.addEventListener("mousemove", this.dragging);
    }

    componentWillUnmount() {
        this.mainRef.current.removeEventListener("mousemove", this.dragging);
    }

    dragStart(event) {
        this.sliderRef.current.style.transition = "";

        const { pageX } = event;
        this.setState({
            isMousePressed: true,
            initialX: pageX,
            currentX: pageX
        })
    }

    dragging(event) {
        const { pageX } = event;
        if (this.state.isMousePressed) {
            this.setState({
                currentX: pageX,
                positionX: this.state.positionX + (pageX - this.state.currentX),
            })
        }
    }

    mouseDrop(event) {
        if (this.state.isMousePressed) {

            this.sliderRef.current.style.transition = "0.2s ease-out"

            this.setState({
                isMousePressed: false
            })

            const { children } = this.props;
            let childrenCount = children.length || 1;

            const { pageX } = event;
            let distance = this.state.initialX - pageX;
            let elementSize = this.mainRef.current.offsetWidth;

            /* pushy enough */
            if (Math.abs(distance) > (elementSize * 0.4)) {
                let newIndex = this.state.index + ((Math.sign(distance)));

                /* inside limits */
                if (newIndex >= 0 && newIndex < childrenCount) {
                    this.setState({
                        index: newIndex,
                        positionX: elementSize * newIndex * - 1
                    });

                /* outside limits */
                } else {
                    this.setState({ positionX: elementSize * this.state.index * - 1 });
                }

            /* not pushy enough */
            } else {
                this.setState({ positionX: elementSize * this.state.index * - 1 });
            }
        }
    }


    render() {
        return (
            <div className="carousel-wrapper" onMouseDown={this.dragStart} onMouseUp={this.mouseDrop} onMouseOut={this.mouseDrop} ref={this.mainRef}>
                <div ref={this.sliderRef} className="item-wrapper" style={{ transform: `translateX(${this.state.positionX}px)` }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Carousel
