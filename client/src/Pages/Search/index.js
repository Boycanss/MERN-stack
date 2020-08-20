import React, { Component } from 'react'
import axios from 'axios'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/search/")
            .then(res => {
                console.log(res);
            })
    }


    render() {
        return (
            <div>

            </div>
        )
    }
}
