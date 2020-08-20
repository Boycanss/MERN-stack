import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            submitted: false,
            message: []
        }
        this.unameOnChange = this.unameOnChange.bind(this);
        this.pwdOnChange = this.pwdOnChange.bind(this);
        this.pwd2OnChange = this.pwd2OnChange.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
    }

    unameOnChange = (e) => {
        this.setState({ username: e.target.value })
    }

    emailOnChange = (e) => {
        this.setState({ email: e.target.value })
    }

    pwdOnChange = (e) => {
        this.setState({ password: e.target.value })
    }

    pwd2OnChange = (e) => {
        this.setState({ password2: e.target.value })
    }

    register = () => {
        const reg = this.state;
        console.log(reg.username, reg.email, reg.password, reg.password2);
        const registerUrl = 'http://localhost:8000/users/register';
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: reg.username,
                email: reg.email,
                password: reg.password,
                password2: reg.password2
            })
        }
        fetch(registerUrl, reqOptions)
            .then((res) => {

                if (res.status === 200) {
                    this.setState({
                        name: "",
                        email: "",
                        password: '',
                        password2: '',
                        submitted: true
                    })
                    this.props.history.push("/login");
                    window.location.reload(false);
                } else if (res.status === 400) {
                    res.json().then((data) => {
                        // console.log(data);
                        this.setState({ message: data })
                    })
                }
            })
    }

    render() {
        let success = null;
        if (this.state.submitted) {
            success = "Anda telah berhasil terdaftar"
        }
        return (

            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label><span style={{ color: 'red' }}>{this.state.message.name}</span>
                    <Form.Control type="text" placeholder="Masukkan Nama" onChange={this.unameOnChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label><span style={{ color: 'red' }}>{this.state.message.email}</span>
                    <Form.Control type="email" placeholder="Masukkan Email" onChange={this.emailOnChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label><span style={{ color: 'red' }}>{this.state.message.password}</span>
                    <Form.Control type="password" placeholder="Masukkan Password" onChange={this.pwdOnChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                    <Form.Label>Konfirmasi Password</Form.Label><span style={{ color: 'red' }}>{this.state.message.password2}</span>
                    <Form.Control type="password" placeholder="Konfirmasi Password" onChange={this.pwd2OnChange} />
                </Form.Group>
                <Button variant="primary" onClick={this.register}>
                    Daftar
                </Button>
                <span>{success}</span>
                <br />
                <br />
                <p>atau</p>
            </Form>
        )
    }
}

export default withRouter(index)