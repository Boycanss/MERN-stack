import React, { Component } from 'react'
import DetailCard from './detail';

export default class info extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            style: {
                position: 'relative',
                bottom: '300px',
                left: '300px',
                width: '230px',
                height: 0,
                opacity: 0,
                backgroundColor: 'rgba(26, 26, 26)',
                transition: 'all 0.1s ease',
                boxShadow: 'rgb(24, 24, 24) 4px 5px 8px',
                padding: '10px',
                color: 'wheat'
            }
        }
        this.transitionEnd = this.transitionEnd.bind(this)
        this.mountStyle = this.mountStyle.bind(this)
        this.unmountStyle = this.unmountStyle.bind(this)
    }

    componentWillReceiveProps(newProps) { // check for the mounted props
        if (this._isMounted === false)
            return this.unMountStyle() // call outro animation when mounted prop is false
        this._isMounted = true;
        this.setState({ // remount the node when the mounted prop is true
            show: true
        })
        setTimeout(this.mountStyle, 10) // call the animation
    }

    unmountStyle() {
        this.setState({
            style: {
                ...this.state.style,
                opacity: 0,
                transition: 'all 1s ease'
            }
        })
    }

    mountStyle() {
        this.setState({
            style: {
                ...this.state.style,
                height: '200px',
                opacity: 0.95,
                transition: 'all 0.3s ease'
            }
        })
    }

    componentDidMount() {
        setTimeout(this.mountStyle, 10) // call the animation
    }

    transitionEnd(e) {
        if (!this.props.mounted) {
            this._isMounted = false;
        }
    }

    render() {
        let style = this.state.style;
        const detail = this.props.info;
        const prc = detail.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        return (
            <div style={{ position: 'absolute' }}>
                <div style={style}>
                    <p style={{ color: 'wheat' }}>{detail.name}</p>
                    <p style={{ fontSize: '11px', color: 'wheat' }}>{detail.tag}</p>
                    <p style={{ fontSize: '10px', color: 'wheat' }} > please wait for few seconds for details</p>
                    <DetailCard />
                    <p style={{ position: 'absolute', bottom: '0', right: '0', paddingRight: '10px', color: 'wheat' }}>
                        {prc}
                    </p>

                </div>
            </div>
        )
    }
}
