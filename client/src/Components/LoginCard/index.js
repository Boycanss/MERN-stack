import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


// var loginFormStyle = {
//     position: 'absolute',
//     right: '40px',
//     top: '50px',
//     backgroundColor: 'skyblue',
//     width: '200px',
//     padding: "15px",
//     boxShadow: 'rgb(24, 24, 24) 4px 5px 8px'
// }

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        //from login form
        this.emailOnChange = this.emailOnChange.bind(this);
        this.pwdOnChange = this.pwdOnChange.bind(this);
    }

    //from login form
    emailOnChange(e) {
        this.setState({ email: e.target.value })
    }

    pwdOnChange(e) {
        this.setState({ password: e.target.value })
    }

    componentDidMount() {
        window.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                this.SubmitLogin()
            } else {
                return;
            }
        })
    }


    SubmitLogin = () => {
        const urlLogin = 'http://localhost:8000/users/login';
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }
        fetch(urlLogin, reqOptions)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        // this.setState({ user: data.user.name })
                        localStorage.setItem('jwtToken', data.token)
                    });
                    this.props.history.push("/")
                    window.location.reload(false);
                    window.location.reload(false);
                } else {
                    res.json().then((data) => {
                        alert(data.email + ", " + (data.password ? data.password : ''))
                    })
                }
            })
    }


    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Masukkan Email" onChange={this.emailOnChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Masukkan Password" onChange={this.pwdOnChange} />
                </Form.Group>
                <Button variant="primary" onClick={this.SubmitLogin}>
                    Submit
                </Button>
                <br />
                <br />
                <p>atau</p>
            </Form>
        )
    }
}

export default withRouter(index)