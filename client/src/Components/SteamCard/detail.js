import React, { Component } from 'react'

const moreImg = [
    'https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/F/V/FV6049_BLT_eCom.jpg',
    'https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/F/V/FV6049_TPP_eCom.jpg',
    'https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/F/V/FV6049_D1_eCom.jpg',
]

export default class detail extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            write: null
        }
        this.alternate = this.alternate.bind(this);
    }


    alternate(i) {
        const self = this

        setTimeout(function run() {
            if (self._isMounted) {
                self.setState({ write: moreImg[i] })
                i++
                // console.log(i);
                if (i === moreImg.length) {
                    i = 0
                }
                setTimeout(run, 2000)
            } else { clearTimeout(run) }
        }, 10)

    }

    componentDidMount() {
        this._isMounted = true;
        this.alternate(0);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.alternate(0);
    }

    render() {

        return (
            <div className="dtlCard">
                {/* <p>{}</p>
                <p>{this.state.write}</p> */}
                <img className="dtlImg" src={this.state.write} alt=""></img>
            </div>
        )
    }
}
