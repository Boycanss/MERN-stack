import React, { Component } from 'react'
import axios from 'axios'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            description: '',
            author: '',
            source: ''
        }
        this.nameOnChange = this.nameOnChange.bind(this);
        this.categoryOnChange = this.categoryOnChange.bind(this);
        this.descOnChange = this.descOnChange.bind(this);
        this.sourceOnChange = this.sourceOnChange.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
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

    sourceOnChange(e) {
        const upload_file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(upload_file)
        reader.onload = () => {
            console.log(reader.result);
        }
    }

    getAuthor() {
        this.setState({
            author: this.props.user.name
        })
    }

    submitImg = () => {
        const reg = this.state;
        const reqOptions = {
            name: reg.name,
            category: reg.category,
            description: reg.description,
            author: reg.author,
            source: reg.source
        }
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
        axios.post('http://localhost:8000/addimage', reqOptions)
            .then(res => {
                if (res.status === 200) {
                    alert("Gambar Berhasil Disimpan");
                    window.location.reload(false);
                } else {
                    alert("error");
                }
            })
    }

    componentDidMount() {
        this.getAuthor();
    }


    render() {
        return (
            <div>
                <form>
                    <label>
                        <span>Name: </span><br />
                        <input type='text' className='name' name='name' onChange={this.nameOnChange} size='30' required />
                    </label><br /><br />

                    <label>
                        <span>Category: </span><br />
                        <input type='text' className='category' name='category' onChange={this.categoryOnChange} size='30' required />
                    </label><br /><br />

                    <label>
                        <span>Description: </span><br />
                        <input type='text' className='description' name='description' onChange={this.descOnChange} size='100' required />
                    </label><br /><br />

                    <label>
                        <span>Pilih file: </span>
                        <input type='file' className='file' name='file' onChange={this.sourceOnChange} required />
                    </label><br /><br />



                    <button type="button" onClick={this.submitImg}>Submit</button><br />
                </form>
            </div>
        )
    }
}
