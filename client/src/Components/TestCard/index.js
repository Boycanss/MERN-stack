import React, { Component } from 'react'
// import './style.css'

export default class index extends Component {

    render() {
        return (
            <div className="testCard"
                style={{
                    width: '300px',
                    height: '225px',
                    backgroundColor: this.props.color,
                    marginRight: '20px',
                    marginBottom: '20px'
                }}>

            </div>
        )
    }
}
