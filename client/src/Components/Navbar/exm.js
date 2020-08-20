import React, { Component } from 'react'
import '../../Components/style.css'
import LoginForm from '../LoginCard';
import { withRouter } from 'react-router-dom';
import UserCard from './userCard'

var Menu = [{ name: 'HOME', href: '/' },
{ name: 'MY PAGE', href: '/mypage' },
{ name: 'ABOUT', href: '/c' },
{ name: 'LOGIN', href: '#login' }];

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            loginForm: false,
            user: {},

        }
        this.onClick = this.onClick.bind(this);
        this.login = this.login.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.liftUser = this.liftUser.bind(this);
        this.logOut = this.logOut.bind(this);

    }

    onClick = async (e) => {
        // e.preventDefault();
        this.setState({ active: e.target.className });
    }

    async login() { //toggle login form
        // e.preventDefault();
        if (!this.state.loginForm) {
            document.addEventListener('click', this.handleClickOutside, false);
        } else {
            document.removeEventListener('click', this.handleClickOutside, false);

        }
        await this.setState({ loginForm: !this.state.loginForm })
    }

    logOut() {
        this.setState({
            user: {}
        })
        localStorage.removeItem('jwtToken');
        window.location.reload(false);
    }

    handleClickOutside(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.login();
    }

    liftUser(loggedInUser) {
        this.setState({ user: loggedInUser })
    }

    componentDidMount() {
        if (this.props.user) {
            this.liftUser(this.props.user)
        }
        // console.log(this.state.user);
    }

    render() {
        let menuName = [];
        let rightMenu = [];
        const activeStyle = { transform: 'scale(1.5)', color: 'black', fontWeight: 'bolder' };
        const loggedUser = this.props.user;
        Menu.forEach((opt) => {
            if (opt.name === 'LOGIN') {
                if (!loggedUser.name) {
                    rightMenu.push(
                        <li key={opt.name}>
                            <a href={opt.href} onClick={this.login} style={this.state.active === opt.name ? activeStyle : {}}>{opt.name}</a>

                        </li>
                    )
                } else {
                    rightMenu.push(
                        <li key={opt.name}>
                            <a href={opt.href} onClick={this.login} style={this.state.active === opt.name ? activeStyle : {}}>{loggedUser.name}</a>

                        </li>
                    )
                }

            } else {
                menuName.push(
                    <li key={opt.name}>
                        <a href={opt.href} className={opt.name} onClick={this.onClick} style={this.state.active === opt.name ? activeStyle : {}}>{opt.name}</a>
                    </li>
                )
            }
        })

        let logForm = null;
        let respon = '';
        if (this.state.loginForm) {
            if (!this.props.user.name) {
                logForm = <LoginForm
                    emailOnChange={this.emailOnChange}
                    pwdOnChange={this.pwdOnChange}
                    SubmitLogin={this.SubmitLogin}
                />
            } else {
                logForm = <UserCard user={this.props.user.name} logout={this.logOut} />

            }
        }
        return (
            <div>
                <div className='Navbar'>
                    <ul className='mainMenus'>
                        {menuName}
                        <div style={{ float: 'right' }} >
                            {rightMenu}
                        </div>
                        {respon}
                        <div className="container" ref={node => { this.node = node; }}>
                            {logForm}
                        </div>

                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(index);