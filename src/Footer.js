import React, { Component } from 'react';
import arrow from './images/arrow.svg'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailOut: false,
      email: '',
    }

    this.onEmailClick = this.onEmailClick.bind(this)
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  onEmailClick(e) {
    const emailOut = !this.state.emailOut
    const emailInput = document.getElementById('email-input')
    if (emailOut && emailInput) { emailInput.focus() }
    this.setState({
      submittedEmail: '',
      emailOut
    })
  }

  handleEmailInput(e) {
    this.setState({
      email: e.currentTarget.value
    })
  }

  handleEmailSubmit(e) {
    const submittedEmail = document.getElementById('email-input').value
    this.setState({
      submittedEmail,
      email: '',
    })
  }

  render() {
    const { screenSize } = this.props
    return (
      <div className='footer'>
        {(this.state.emailOut || this.state.submittedEmail) && <div className='hit-box' onClick={this.onEmailClick} />}
        <h2 className={`title ib ${this.state.emailOut ? 'compress' : ''}`}>{screenSize > 1000 && !this.state.submittedEmail ? 'IT WAS A GOOD DREAM' : 'IWAGD'}</h2>

        <div className='nav ib'>
          {this.state.submittedEmail ?
            <span className='confirmed'>Congratulations. A confirmaion email has been sent to {this.state.submittedEmail}</span>
            :
            <div className='nav-pill ib'>
              {!this.state.emailOut &&
                <h4
                  className='ib footer-nav email-signup'
                  onClick={this.onEmailClick}
                >
                  EMAIL SIGNUP
                </h4>}
                <form className='ib' onSubmit={this.handleEmailSubmit}>
                  <input
                    type='text'
                    id='email-input'
                    className={`ib email-field ${this.state.emailOut ? 'expanded' : 'hidden'}`}
                    onChange={this.handleEmailInput}
                    placeholder='EMAIL@EMAIL.COM'
                    value={this.state.email}
                    onSubmit={this.handleEmailSubmit}
                    autoFocus
                  />
                </form>
              {this.state.emailOut &&
                <div className='arrow-wrapper ib' onClick={this.handleEmailSubmit}>
                  <img className='email-arrow' src={arrow} alt='arrow' />
                </div>
              }
            </div>}
          <div className='nav-pill ib'>
            {this.props.currentPage === 'preorder' ?
              <h4 className='footer-nav' id='landing' onClick={this.props.handlePageSwitch}>BACK TO HOME</h4>
              :
              <h4 className='footer-nav' id='preorder' onClick={this.props.handlePageSwitch}>PREORDER THE ALBUM</h4>}
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
