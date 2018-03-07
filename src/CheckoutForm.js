import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import PromoCodeInput from './PromoCodeInput';
import Totals from './Totals';
import x from './images/x.svg';

class CheckoutForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showContent: false,
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.stripe.createToken({
      name: "BLAH"
    }).then(({ token }) => {
      console.log("hey bruh yeah I got a token, ya heard?", token, "with Perd.");
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showContent: true })
    }, 100)
  }

  render() {
    let total = 0

    this.props.lineItems.forEach(item => {
      total += item.qty * item.price
    })
    return (
      <div className={`checkout-form ${this.props.showCheckout ? 'expanded' : 'collapsed'}`}>
        {this.state.showContent &&
          <div>
            <table className='full checkout-table'>
              {this.props.lineItems.map(lineItem => (
                lineItem.qty > 0 &&
                <tr className='line-item'>
                  <td className='w70'><h4 className='thin'>{lineItem.name}{lineItem.qty > 1 ? ` - qty. ${lineItem.qty}` : ''}</h4></td>
                  <td className='w20'>
                    <h4 className='ib'>
                      {`$${lineItem.price * lineItem.qty}.00`}
                    </h4>
                  </td>
                  <td><img src={x} className='ib box' /></td>
                </tr>
              ))}
            </table>
            <PromoCodeInput />
            <table className='full totals-table'>
              <tr className='total-line-item shipping-line'>
                <td className='w70'><span>SHIPPING</span></td>
                <td className='w30'><span>$5.00</span></td>
              </tr>
              <tr className='total-line-item total-line'>
                <td className='w70'><h3>TOTAL</h3></td>
                <td className='w30'><h3>{`$${total}.00`}</h3></td>
              </tr>
            </table>
            <input
              type="submit"
              value="CHECKOUT"
              className="btn full checkout"
            />
        </div>}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
