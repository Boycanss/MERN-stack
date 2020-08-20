import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            id: '',
            liked: [],
            user: ''
        }
        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
    }

    componentDidMount() {
        const likes = this.props.likes;
        const id = this.props.id;
        const user = this.props.user;
        const liked = this.state.liked.concat(user.likedPost)
        this.setState({ id: id, likes: likes, liked: liked, user: user._id })
    }

    async like() {
        const { id, user } = this.state
        console.log('user: ' + user);

        const reqOptions = {
            user: user
        }
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.post(`http://localhost:8000/likes/${id}`, reqOptions)
            .then(res => {
                this.setState({
                    likes: res.data.newLike,
                    liked: res.data.updatedUser
                })
            })
            .catch(err => {
                if (err) {
                    this.props.history.push("/")
                }
            })
    }

    async dislike() {
        const { id, user } = this.state
        const reqOptions = {
            user: user
        }

        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.post(`http://localhost:8000/dislike/${id}`, reqOptions)
            .then(res => {
                this.setState({
                    likes: res.data.newLike,
                    liked: res.data.updatedUser
                })
            })
            .catch(err => {
                if (err) {
                    this.props.history.push("/")
                }
            })
    }

    render() {
        let button = null;
        if (this.state.liked.includes(this.state.id)) {
            button = (
                <Button onClick={this.dislike}><HeartFill size={30} /></Button>
            )
        } else {
            button = (<Button onClick={this.like}><Heart size={30} /></Button>)
        }
        return (
            <div className="likes">
                <div>
                    {button}
                    <br />
                    <span style={{ marginRight: '17px' }}>{this.state.likes}</span>
                    {/* <span>{this.state.id}</span> */}
                </div>
            </div>
        )
    }
}

export default withRouter(likes)