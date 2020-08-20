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
        const lifted = this.state.data.concat(IncomingData);
        this.setState({ data: lifted })
    }

    liftUser(IncomingUser) {
        this.setState({
            user: IncomingUser
        })
    }

    render() {
        const { data } = this.state;
        let listItems = [];
        data.forEach((image) => {
            listItems.push(image.category)
        })
        let newSetCategory = [];
        const gg = listItems.filter((item, index) => listItems.indexOf(item) !== index)
        newSetCategory.push(gg)
        return (
            <div style={{ margin: '20px' }}>
                <PostImage user={this.props.user} />
                <Grid fluid >
                    <Row>
                        {newSetCategory}
                    </Row>
                </Grid>

            </div >
        )
    }
}
