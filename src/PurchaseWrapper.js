import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import * as Scroll from 'react-scroll';
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import CheckoutForm from './CheckoutForm';
import PaymentPage from './PaymentPage';
import pin from './images/Blue-Hair.png';

class PurchaseWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineItems: [
        {name: 'vinyl', price: 20, qty: 0},
        {name: 'pin', price: 10, qty: 0},
      ],
    }

    this.addToCart = this.addToCart.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleCheckoutSubmit = this.handleCheckoutSubmit.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        rollVinyl: true
      })
    }, 200)
  }

  addToCart(e) {
    e.preventDefault()
    const { lineItems } = this.state
    lineItems[e.currentTarget.dataset.index].qty += 1
    this.setState({
      lineItems
    }, scroll.scrollTo(100))
  }

  removeItem(e) {
    const { lineItems } = this.state
    lineItems[e.currentTarget.dataset.i].qty -= 1
    this.setState({
      lineItems
    })
  }

  handleCheckoutSubmit(e) {
    e.preventDefault()
    this.setState({
      currentPage: this.state.currentPage === 'checkout' ? '' : 'checkout',
    })
  }

  setTotal(total) {
    this.setState({
      total
    })
  }

  render() {
    const showCheckout = this.state.lineItems.filter(item => item.qty > 0).length > 0
    let total = 0
    this.state.lineItems.forEach(item => {
      total += item.qty * item.price
    })

    return (
      <div className='purchase-wrapper'>
        {this.state.currentPage !== 'checkout' && <div className='album-wrapper'>
          <div className='vinyl-wrapper'>
            <img src={this.props.albumCover} alt='album-cover' className={`ib vinyl-roll album-cover ${this.state.rollVinyl ? 'shift' : ''}`} />
            <img src={this.props.vinyl} alt='vinyl' className={`ib vinyl-roll vinyl ${this.state.rollVinyl ? 'shift' : ''}`} />
          </div>

          <div className='product-details album'>
            <div className='title-and-price'>
              <h3 className='ib'>It Was A Good Dream - LP</h3>
              <h3 className='ib right'>$20.00</h3>
            </div>
            <div className='two-thirds'>
              <p>1. Forgetting How To Speak</p>
              <p>2. Words Dissolve, Your Voice Wanders</p>
              <p>3. falling/running/mute</p>
              <p>4. You Left a Letter and a Song</p>
              <p>5. A Blistering Reminder of Why You Are Where You Are</p>
            </div>

            <div className='add-to-cart'>
              <div className='ib two-thirds left'>
                <h5>Digital download of "Forgetting How To Speak" available immediately with preorder</h5>
              </div>
              <div className='ib right'>
                <button
                  className='btn mid'
                  data-index={0}
                  data-name='vinyl'
                  data-price={20}
                  onClick={this.addToCart}
                >
                  {this.state.lineItems.filter(item => item.name === 'vinyl' && item.qty > 0).length > 0 ?
                    'ADD ANOTHER' : 'ADD TO CART'}
                </button>
              </div>
            </div>
          </div>

          <div className='product-details second'>
            <img src={pin} className='ib pin' />
            <div className='right two-thirds'>
              <h3 className='ib'>Blue Hair Enamel Pin</h3>
              <h3 className='ib right'>$10.00</h3>
              <div className='pin-details'>
                <p className='ib'>1" x 1" enamel pin</p>
                <button
                  className='btn mid right'
                  data-index={1}
                  data-name='pin'
                  data-price={10}
                  onClick={this.addToCart}
                >
                  {this.state.lineItems.filter(item => item.name === 'pin' && item.qty > 0).length > 0 ?
                    'ADD ANOTHER' : 'ADD TO CART'}
                </button>
              </div>
            </div>
          </div>
        </div>}

        <Elements>
          <CheckoutForm
            showCheckout={showCheckout}
            lineItems={this.state.lineItems}
            removeItem={this.removeItem}
            handleCheckoutSubmit={this.handleCheckoutSubmit}
            paymentPage={this.state.currentPage === 'checkout'}
            total={total}
          />
        </Elements>

        {this.state.currentPage === 'checkout' &&
          <PaymentPage
            total={total}
          />
        }
        }
      </div>
    )
  }
}

export default PurchaseWrapper
