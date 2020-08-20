import React, { Component } from 'react';
// import db from './db';
import PostImage from '../../Components/PostImageForm'
import axios from 'axios';
import ImgCard from '../../Components/ImgCard'
// import { Container, Row, Col } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-flexbox-grid'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {}
        }
        this.liftUser = this.liftUser.bind(this);
        this.liftData = this.liftData.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState) {
        const { user, data } = this.state;
        if (!user.name) {
            return nextProps.data !== data
        }
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
                    console.log(err);
                    this.props.history.push("/")
                }
            })
    }

    liftData(IncomingData) {
        this.setState({
            data: IncomingData
        })
    }

    liftUser(IncomingUser) {
        this.setState({
            user: IncomingUser
        })
    }

    render() {
        // console.log(this.state.data);
        const listItems = this.state.data.map((id) =>
            <Col key={id._id}>
                <ImgCard data={id} user={this.state.user} />
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
