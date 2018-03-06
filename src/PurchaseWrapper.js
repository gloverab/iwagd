import React, { Component } from 'react';
import albumCover from './images/IWAGD-Album-1.jpg'
import vinyl from './images/vinyl.png'

class PurchaseWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        rollVinyl: true
      })
    }, 200)
  }

  render() {
    return (
      <div>
        <div className='vinyl-wrapper'>
          <img src={albumCover} alt='album-cover' className={`ib vinyl-roll album-cover ${this.state.rollVinyl ? 'shift' : ''}`} />
          <img src={vinyl} alt='vinyl' className={`ib vinyl-roll vinyl ${this.state.rollVinyl ? 'shift' : ''}`} />
        </div>
      </div>
    )
  }
}

export default PurchaseWrapper
