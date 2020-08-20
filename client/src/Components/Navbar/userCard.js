import React, { Component } from 'react';

var UserCardStyle = {
    position: 'absolute',
    height: '200px',
    width: '100px',
    backgroundColor: 'red',
    right: '50px',
    top: '50px',
    boxShadow: '7px 4px 11px 0px black',
    zIndex: 3,
    padding: '20px'
}


export default class userCard extends Component {
    render() {
        return (
            <div style={UserCardStyle}>
                <a style={{ textDecoration: 'none', fontWeight: 'bolder' }} href="/profile">My profile</a><br /><br />
                <button style={{ position: 'absolute', bottom: '20px', right: '20px' }} onClick={this.props.logout}>Log out</button>
            </div>
        )
    }
}
