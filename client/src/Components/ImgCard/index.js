import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import Likes from './likes'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: {},
            imgStyle: {
                maxHeight: '200px',
                transition: 'ease-in-out .25s'
            },
            pStyle: {
                color: ' wheat',
                opacity: 0
            },
            author: '',
            title: '',
            likes: 0
        }
        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
        this.liftData = this.liftData.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this)
    }
    hover() {
        this.setState({
            imgStyle: {
                ...this.state.imgStyle,
                filter: 'brightness(70%)'
            },
            pStyle: {
                ...this.state.pStyle,
                opacity: 1
            },
            author: this.state.data.author,
            title: this.state.data.name,
            likes: this.state.data.likes
        })
    }
    leave() {
        this.setState({
            imgStyle: {
                ...this.state.imgStyle,
                filter: 'brightness(100%)'
            },
            pStyle: {
                ...this.state.pStyle,
                opacity: 0
            },
            author: '',
            title: ''
        })
    }

    liftData(incomingData) {
        this.setState({
            data: incomingData
        })
    }

    componentDidMount() {
        const incomingData = this.props.data;
        this.liftData(incomingData)
    }

    hide() {
        this.setState({
            show: false
        })
    }

    show() {
        this.setState({
            show: true
        })
    }


    render() {
        return (
            <>

                <div style={{ maxHeight: '200px', margin: '5px' }}>
                    <button className="imgShow" onClick={this.show}>
                        <img onMouseEnter={this.hover} onMouseLeave={this.leave} style={this.state.imgStyle} src={'http://localhost:8000/' + this.state.data.file} alt=""></img>
                    </button>
                    <div className="keterangan" onMouseEnter={this.hover} onMouseLeave={this.leave}>
                        <p style={this.state.pStyle}>{this.state.title}</p>
                        <p style={this.state.pStyle}>{this.state.author}</p>
                    </div>

                </div>
                <Modal size="lg" show={this.state.show} onHide={this.hide} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 style={{ color: 'black', fontWeight: 'bolder' }}>{this.state.data.name}</h3>
                            <span style={{ fontSize: '15px' }}>by: {this.state.data.author}</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="bigImgContainer">
                            <img className="bigImg" src={'http://localhost:8000/' + this.state.data.file} alt=""></img>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontWeight: 'bold' }}>Description: </span> <br />
                            <span>{this.state.data.description}</span>
                        </div>
                        <Likes likes={this.state.data.likes} id={this.state.data._id} user={this.props.user} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
