import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Search } from 'react-bootstrap-icons';
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import axios from 'axios';

class searchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: ''
        }
        this.keyOnChange = this.keyOnChange.bind(this);
    }

    keyOnChange(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    submit = () => {
        const { keywords } = this.state;
        const formData = new FormData();
        formData.append('keyword', keywords)
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.get(`http://localhost:8000/search/${this.state.keywords}`)
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push("/search")
                    window.location.reload(false)
                } else {
                    alert('No data')
                }
            })

    }

    render() {
        return (
            <>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" onClick={this.submit}><Search /></Button>
                    </InputGroup.Prepend>
                    <FormControl aria-describedby="basic-addon1" onChange={this.keyOnChange} />
                </InputGroup>
            </>
        )
    }
}

export default withRouter(searchBar)