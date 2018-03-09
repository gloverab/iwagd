import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

class PaymentPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const client = {
      sandbox: 'Aa8UO_lUz_NVdRhQ-K4hjsZUF7dg3lPhK5nNXJX_vJyIu0Xj2duhaWS1q3YMCRQkAaoOlmrqz7eBvCem',
      production: 'AdyZ39_yUpC6TxcGD5dBqzOjO3J1kd4zVerK9sOoRKEz7RuT7bS6vdBzhsDyB79cF8h8KedqstXO4LId'
    }

    let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    const payment = (data, actions) => {
      return actions.payment.create({
        transactions: [
          {
            amount: { total: this.props.total, currency: 'USD' }
          }
        ]
      });
    }

    const onAuthorize = (data, actions) => {
      return actions.payment.execute().then(function(paymentData) {
          // Show a success page to the buyer
      });
    }

    return (
      <div className='payment-page'>
        <div className='checkout-options'>
          <h2>Checkout Options</h2>
        </div>
        <div className='paypal-wrapper'>
          <PayPalButton
            client={client}
            payment={payment}
            onAuthorize={onAuthorize}
            style={
              {color: 'silver', shape: 'rect', size: 'responsive'}
            }
          />
        </div>
      </div>
    )
  }
}

export default PaymentPage
