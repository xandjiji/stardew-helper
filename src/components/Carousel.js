import React, { Component } from 'react'

import '../css/carousel.css';

export class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            positionX: 0,
            positionY: 0
        }

        this.ref = React.createRef();

        this.dragStart = this.dragStart.bind(this);
        this.dragging = this.dragging.bind(this);
        this.mouseDrop = this.mouseDrop.bind(this);
    }

    componentDidMount() {
        this.ref.current.addEventListener("mousemove", this.dragging);
    }

    componentWillUnmount() {
        this.ref.current.removeEventListener("mousemove", this.dragging);
    }

    dragStart(event) {
        const { pageX, pageY } = event;
        this.setState({
            isMousePressed: true,
            initialX: pageX,
            initialY: pageY
        });        
    }

    dragging(event) {
        
        if(this.state.isMousePressed) {
            const { pageX, pageY } = event;
    
            this.setState({
                initialX: pageX,
                initialY: pageY,
                positionX: this.state.positionX + (pageX - this.state.initialX),
                positionY: this.state.positionY + (pageY - this.state.initialY)
            })

            /* console.log(this.state.positionX + (pageX - this.state.initialX)); */
            
        }
        

    }

    mouseDrop(event) {

        const { pageX, pageY } = event;

        this.setState({
            isMousePressed: false,
            /* positionX: this.state.positionX + (pageX - this.state.initialX),
            positionY: this.state.positionY + (pageY - this.state.initialY) */
        })

    }

    render() {


        return (
            <div className="carousel-wrapper" onMouseDown={this.dragStart} onMouseUp={this.mouseDrop} ref={this.ref}>
                <div className="item-wrapper" style={{ transform: `translateX(${this.state.positionX}px)` }}>
                    <div className="carousel-item red">a</div>
                    <div className="carousel-item blue">b</div>
                    <div className="carousel-item green">c</div>
                </div>
            </div>
        )
    }
}

export default Carousel
