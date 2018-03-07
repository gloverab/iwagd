import React, { Component } from 'react';

class CheckoutForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.stripe.createToken({
      name: "BLAH"
    }).then(({ token }) => {
      console.log("hey bruh yeah I got a token, ya heard?", token, "with Perd.");
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        {this.props.lineItems.map(lineItem => (
          <LineItem
            itemName={lineItem.itemName}
            itemPrice={lineItem.itemPrice}
          />
        ))}
        <PromoCodeInput />
        <Totals />
        <input
          type="submit"
          value="CHECKOUT"
          className="checkout-button"
        />
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
