import React, { Component } from 'react'
import { Accordion, Card, Button, Form, Container, Row, Col, Badge } from 'react-bootstrap'
import axios from 'axios'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            description: '',
            file: ''
        }
        this.nameOnChange = this.nameOnChange.bind(this);
        this.categoryOnChange = this.categoryOnChange.bind(this);
        this.descOnChange = this.descOnChange.bind(this);
        this.sourceOnChange = this.sourceOnChange.bind(this);
    }

    nameOnChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    categoryOnChange(e) {
        this.setState({
            category: e.target.value
        })
    }

    descOnChange(e) {
        this.setState({
            description: e.target.value
        })
    }



    // getAuthor() {
    //     this.setState({
    //         author: this.props.user.name
    //     })
    // }

    sourceOnChange(e) {
        const upload_file = e.target.files[0];
        this.setState({
            file: upload_file
        })
    }

    submitImg = () => {
        const user = this.props.user.name;
        const { name, category, description, file } = this.state
        const value = [name, category, description, user, file];
        const body = ['name', 'category', 'description', 'author', 'file']
        const formData = new FormData();
        for (let i = 0; i < value.length; i++) {
            formData.append(body[i], value[i]);
        }

        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.post('http://localhost:8000/addimage', formData)
            .then(res => {
                if (res.status === 200) {
                    alert("Gambar Berhasil Disimpan");
                    window.location.reload(false);
                } else {
                    alert("error");
                }
            })
    }


    render() {
        const user = this.props.user;
        if (!user.name) {
            return (
                <div style={{ margin: '50px', display: 'flex', justifyContent: 'center' }}>
                    <h4>Login First to View the Arts!</h4>
                </div>
            )
        }
        return (
            <Accordion>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey='0'>
                        Add Foto <h3><Badge variant="primary">+</Badge></h3>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                        <Form>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicTitle">
                                            <Form.Control type="text" placeholder="Image Title" onChange={this.nameOnChange} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicCategory">
                                            <Form.Control type="text" placeholder="Image Category" onChange={this.categoryOnChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formBasicDescription">
                                            <Form.Control as='textarea' type="text" placeholder="Image Description" onChange={this.descOnChange} />
                                        </Form.Group>
                                        <Form.File onChange={this.sourceOnChange} />
                                        <Button style={{ position: 'absolute', right: '16px', bottom: '2px' }} variant="primary" onClick={this.submitImg}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>

        )
    }
}
