import React, { Component } from 'react';
// import db from './db';
import PostImage from '../../Components/PostImageForm'
import axios from 'axios';
import ImgCard from '../../Components/ImgCard'
import { Button, Modal } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-flexbox-grid'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {},
            confirm: false,
            id: ''
        }
        this.liftUser = this.liftUser.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.liftData = this.liftData.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.get("http://localhost:8000/")
            .then(res => {
                this.liftData(res.data);
                this.liftUser(this.props.user)
            })
            .catch(err => {
                if (err.status === 401) {
                    // console.log(err);
                    this.props.history.push("/")
                }
            })
    }

    liftData(IncomingData) {
        IncomingData.forEach(image => {
            if (image.author === this.props.user.name) {
                const lifted = this.state.data.concat(image);
                this.setState({ data: lifted })
            }
        });
    }

    liftUser(IncomingUser) {
        this.setState({
            user: IncomingUser
        })
    }

    deletePost(e) {
        e.preventDefault();
        const id = e.target.value;
        console.log(id);
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.post(`http://localhost:8000/deleteImage/${id}`)
            .then(res => {
                if (res.status === 200) {

                    window.location.reload(false);
                }
                else {
                    console.log(res.message);
                }
            })
    }

    async confirmDelete(e) {
        const id = e.target.value
        await this.setState({
            id: id,
            confirm: true
        })
    }

    async close() {
        await this.setState({
            confirm: false
        })
    }

    render() {
        const listItems = this.state.data.map((id) =>
            <Col key={id._id}>
                <ImgCard data={id} />
                <Button value={id._id} onClick={this.confirmDelete} variant='danger' style={{ marginLeft: '5px' }}>Delete</Button>
                <Button style={{ marginLeft: '10px' }}>Edit</Button>
                <Modal show={this.state.confirm}
                    onHide={this.close}
                >
                    <Modal.Body>
                        Are you sure to delete this post?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" value={this.state.id} onClick={this.deletePost}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        );
        return (
            <div style={{ margin: '20px' }}>
                <PostImage user={this.props.user} />
                <Grid fluid >
                    <Row>
                        {listItems}
                    </Row>
                </Grid>

            </div >
        )
    }
}
