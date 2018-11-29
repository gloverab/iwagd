import React, { Component } from 'react';
import arrow from './images/arrow.svg'
import albumCover from './images/IWAGD-Album-1.jpg'
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Mailchimp from './Mailchimp';

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailOut: false,
      email: '',
    }

    this.showAlbum = this.showAlbum.bind(this)
    this.hideAlbum = this.hideAlbum.bind(this)
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({
        emailOut: false,
        showAlbum: false,
      })
    }
  }

  showAlbum() {
    this.setState({
      showAlbum: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          albumRise: true
        })
      }, 50)
    })
  }

  hideAlbum() {
    this.setState({
      albumRise: false,
    }, () => {
      setTimeout(() => {
        this.setState({
          showAlbum: false
        })
      }, 200)
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
    const url = "https://birdlabrecords.us17.list-manage.com/subscribe/post?u=5f414c713408a33c6eddaac3f&id=f9ce0dc3ce"
    const SimpleForm = () => <MailchimpSubscribe url={url} />

    return (
      <div className='navbar'>
        {this.state.showAlbum && <div className={`hover-album ${this.state.albumRise ? 'rise' : ''} ${this.state.albumSpread ? 'spread' : ''}`}>
          {this.props.images[0]}
        </div>}
        {(this.props.emailOut || this.props.submittedEmail) && <div className='hit-box' onClick={this.props.onEmailClick} />}
        <h2
        className={`title ib glitch ${this.props.emailOut ? 'compress' : ''}`}
        data-text={screenSize > 1000 && !this.props.submittedEmail ? 'IT WAS A GOOD DREAM' : 'IWAGD'}
        >
        {screenSize > 1000 && !this.props.submittedEmail ? 'IT WAS A GOOD DREAM' : 'IWAGD'}</h2>

        <div className='nav ib'>
          {this.props.submittedEmail ?
            <span className='confirmed'>Congratulations. A confirmaion email has been sent to {this.state.submittedEmail}</span>
            :
            <div className='nav-pill ib'>
              {!this.props.emailOut &&
                <h4
                  className='ib navbar-nav email-signup glitch'
                  onClick={this.props.onEmailClick}
                  data-text="don't lose touch"
                >
                  {this.props.emailSuccess ? 'THANKS. TALK SOON.' : "DON'T LOSE TOUCH"}
                </h4>}
                <div className={`ib email-field-wrapper ${this.props.emailOut ? 'expanded' : 'hidden'}`}>
                  <div className='form-wrapper'>
                    {<Mailchimp
                      action='https://birdlabrecords.us17.list-manage.com/subscribe/post?u=5f414c713408a33c6eddaac3f&id=f9ce0dc3ce'
                      fields={[
                        {
                          name: 'EMAIL',
                          placeholder: 'YOUR EMAIL',
                          type: 'email',
                          required: true
                        }
                      ]}
                      onEmailSuccess={this.props.onEmailSuccess}
                    />}
                  </div>
                </div>

                {/*<form className='ib' onSubmit={this.handleEmailSubmit}>
                  <input
                    type='text'
                    id='email-input'
                    className={`ib email-field ${this.props.emailOut ? 'expanded' : 'hidden'}`}
                    onChange={this.handleEmailInput}
                    placeholder='YOU@EMAIL.COM'
                    value={this.state.email}
                    onSubmit={this.handleEmailSubmit}
                    autoFocus
                  />
                </form>*/}
              {/*this.props.emailOut &&
                <div className='arrow-wrapper ib' onClick={this.handleEmailSubmit}>
                  <img className='email-arrow' src={arrow} alt='arrow' />
                </div>
              */}
            </div>}
          <div className='nav-pill ib'>
            {this.props.currentPage === 'preorder' ?
              <h4 className='navbar-nav' id='landing' onClick={this.props.handlePageSwitch}>BACK TO HOME</h4>
              :
              <h4
                className='navbar-nav glitch'
                id='preorder'
                onMouseEnter={this.showAlbum}
                onMouseLeave={this.hideAlbum}
                data-text='PREORDER VINYL'
                onClick={this.props.handlePageSwitch}>PREORDER VINYL</h4>}
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
