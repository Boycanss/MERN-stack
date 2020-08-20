import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { NavDropdown, Button } from 'react-bootstrap';
import SearchBar from './searchBar'

export default class index extends Component {

    logout() {
        localStorage.removeItem('jwtToken');
        window.location.reload(false);
    }


    render() {
        const user = this.props.user
        let rightNavbar = null;
        if (!user.name) {
            rightNavbar = (
                <NavLink
                    style={{ position: 'absolute', right: '20px' }}
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                    to="/login"
                >
                    Login
                </NavLink>
            )
        } else {
            rightNavbar = (
                <NavDropdown title={this.props.user.name} id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                        <NavLink to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                            Profile
                        </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <NavLink to="/myPage" style={{ textDecoration: 'none', color: 'black' }}>
                            My Page
                        </NavLink>
                    </NavDropdown.Item><br />
                    <Button style={{ position: 'relative', left: '20px' }} variant="danger" onClick={this.logout}>Logout</Button>
                </NavDropdown>)
        }

        return (
            <div>
                <nav className="navbargg">
                    <NavLink
                        exact
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/"
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/topic"
                    >
                        TOPIC
                    </NavLink>
                    {/* <SearchBar /> */}

                    {rightNavbar}
                </nav>
            </div>
        )
    }
}
