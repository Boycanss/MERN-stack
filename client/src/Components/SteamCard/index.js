import React, { Component } from 'react';
import Info from './info';
import '../../Components/style.css'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: false,
            data: this.props.database
        }
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    async onMouseEnter() {
        await this.setState({ info: true });
    }

    async onMouseLeave() {
        await this.setState({ info: false });
        // console.log(this.state.info);
    }

    render() {
        const info = this.state.info;
        const data = this.state.data;
        let infocard = null;
        if (info === true) {
            infocard = <Info info={data} onTransitionEnd={this.transitionEnd} mounted={this.state.info} dtl={this.state.info} />
        } else {
            infocard = null;
        }

        return (
            <div style={{ top: '15px', width: '280px', height: '310px' }}>
                <div className="steamCard" >
                    <img
                        className="cardImg"
                        src={data.src}
                        alt=''
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >
                    </img>
                </div >
                {infocard}
            </div>
        )
    }
}