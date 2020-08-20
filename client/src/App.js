import React, { Component } from 'react'
import Axios from 'axios';
import Navbar from './Components/Navbar'
import Routes from './Routes/routes'
import './Components/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedInStatus: false
    }
    // this.setLoggedInUser = this.setLoggedInUser.bind(this);
    this.detectIsLoggedIn = this.detectIsLoggedIn.bind(this);
  }


  detectIsLoggedIn() {
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
    Axios.get('http://localhost:8000/users/verify/token')
      .then(res => {
        if (res.data && this.state.loggedInStatus === false) {
          console.log(res.data.user);
          this.setState({
            loggedInStatus: true,
            user: res.data.user
          })
        } else if (!res.data && this.state.loggedInStatus === false) {
          this.setState({
            loggedInStatus: false,
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      })
  }

  componentDidMount() {
    this.detectIsLoggedIn();
  }




  render() {
    return (
      <>
        <Navbar user={this.state.user} />
        <Routes user={this.state.user} />
      </>
    )
  }
}