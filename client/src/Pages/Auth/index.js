import React, { Component } from 'react'
import LoginCard from '../../Components/LoginCard'
import RegisterCard from '../../Components/RegisterCard'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true
        }
        this.toggle = this.toggle.bind(this);
    }

    async toggle() {
        await this.setState({
            login: !this.state.login
        })
    }

    render() {
        let card = null;
        if (this.state.login) {
            card = (
                <div>
                    <LoginCard />
                    <NavLink to="#" style={{ position: 'relative', textDecoration: 'none' }}
                        onClick={this.toggle}
                    >Daftar Sekarang!</NavLink>
                </div>
            )
        } else {
            card = (
                <div>
                    <RegisterCard />
                    <NavLink to="#" style={{ position: 'relative', textDecoration: 'none' }}
                        onClick={this.toggle}
                    >Login Sekarang!</NavLink>
                </div>
            )
        }

        return (
            <Container style={{ marginTop: '20px' }}>
                <Row className="justify-content-md-center">
                    <Col style={{ backgroundColor: 'skyblue', padding: '10px' }}>
                        <span style={{ fontWeight: 'bolder' }}>Silahkan login atau daftar terlebih dahulu untuk mendapatkan fitur: </span>
                        <br />
                        <div style={{ marginLeft: '20px' }}>
                            <span>Like Foto</span> <br />
                            <span>Tambahkan Foto </span><br />
                            <span>Hapus Foto </span><br />
                        </div>
                    </Col>
                    <Col style={{ backgroundColor: 'wheat', padding: '10px' }}>
                        {card}
                    </Col>
                </Row>
            </Container>


        )
    }
}
