import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Topic from '../Pages/Topic';
import Profile from '../Pages/Profile'
import React, { Component } from 'react'
import Login from '../Pages/Auth';
import Search from '../Pages/Search'
import MyPage from '../Pages/MyPage'

export default class routes extends Component {
    render() {
        const user = this.props.user;

        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Home {...props} user={user} />} />
                    <Route path="/topic" render={props => <Topic {...props} user={user} />} />
                    <Route path="/profile" render={props => <Profile {...props} user={user} />} />
                    <Route path="/login" render={props => <Login {...props} user={user} />} />
                    <Route path="/search" render={props => <Search {...props} user={user} />} />
                    <Route path="/myPage" render={props => <MyPage {...props} user={user} />} />
                </Switch>
            </div>
        )
    }
}
