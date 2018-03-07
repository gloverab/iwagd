import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import pin from './images/Blue-Hair.png';

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
        <div classname='album-wrapper'>
          <div className='vinyl-wrapper'>
            <img src={this.props.albumCover} alt='album-cover' className={`ib vinyl-roll album-cover ${this.state.rollVinyl ? 'shift' : ''}`} />
            <img src={this.props.vinyl} alt='vinyl' className={`ib vinyl-roll vinyl ${this.state.rollVinyl ? 'shift' : ''}`} />
          </div>

          <div className='product-details'>
            <div className='title-and-price'>
              <h3 className='ib'>It Was A Good Dream - LP</h3>
              <h3 className='ib right'>$20.00</h3>
            </div>
            <div className='two-thirds'>
              <p className='track-list'>Track list</p>
              <p>1. Forgetting How To Speak</p>
              <p>2. Words Escape. Voices Emerge.</p>
              <p>3. Grig.</p>
              <p>4. You Left a Letter and a Song.</p>
              <p>5. A Blistering Reminder of Why You Are Where You Are</p>
            </div>

            <div className='add-to-cart'>
              <div className='ib two-thirds left'>
                <h5>Digital download of "Forgetting How To Speak" available immediately with preorder</h5>
              </div>
              <div className='ib right'>
                <button className='btn mid'>Add To Cart</button>
              </div>
            </div>
          </div>

          <div className='product-details'>
            <img src={pin} />
          </div>
        </div>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    )
  }
}

export default PurchaseWrapper
