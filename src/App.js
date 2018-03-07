import React, { Component } from 'react';
import PurchaseWrapper from './PurchaseWrapper';
import Footer from './Footer';
import { Tooltip } from 'react-tippy';
import albumCover from './images/album-art-350px.jpg'
import vinyl from './images/vinyl.png'
import { StripeProvider } from 'react-stripe-elements';
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect'
import spotifyIcon from './images/spotify-icon-rgb-white.svg';
import appleIcon from './images/shape.svg';
import bandcampIcon from './images/bandcamp-icon.png';
import instaIcon from './images/3-layers.svg';
import arrow from './images/arrow.svg'
import './App.css';
import 'react-tippy/dist/tippy.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: window.innerWidth,
      currentPage: 'landing'
    }

    this.onEmailClick = this.onEmailClick.bind(this)
    this.setScreenSize = this.setScreenSize.bind(this)
    this.handlePageSwitch = this.handlePageSwitch.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setScreenSize)
    this.setState({
      images: [
        <img src={albumCover} alt='album cover' />
      ]
    })
  }

  setScreenSize(e) {
    const screenSize = window.innerWidth
    this.setState({
      screenSize
    })
  }

  handlePageSwitch(e) {
    this.setState({
      currentPage: e.currentTarget.id,
    })
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

  render() {
    // const isMobile = true

    return (
      <div className="App" id='app'>
        {(this.state.emailOut || this.state.submittedEmail) && <div className='hit-box' onClick={this.onEmailClick} />}
        {isMobile && <h2 className='mobile-header'>IT WAS A GOOD DREAM</h2>}
        {isMobile &&
          <div className='mobile-center-wrap'>
            <div className={`bottom ${this.state.emailOut ? 'grow' : ''}`}>
              <div className={`mobile-email-wrapper ${this.state.emailOut ? 'grow' : ''}`}>
                {!this.state.emailOut && <button className='btn big mobile' id='mobile-email-btn' onClick={this.onEmailClick}>DON'T LOSE TOUCH.</button>}
                {this.state.emailOut &&
                  <form className='mobile-email-form' onSubmit={this.handleEmailSubmit}>
                    <input
                      type='text'
                      id='email-input'
                      className={`ib email-field`}
                      onChange={this.handleEmailInput}
                      placeholder='EMAIL@EMAIL.COM'
                      value={this.state.email}
                      onSubmit={this.handleEmailSubmit}
                      autoFocus
                    />
                  <input
                    type='submit'
                    className='btn full'
                    />
                  </form>}
              </div>
              <div className='social-wrapper'>
                <img src={spotifyIcon} alt='spotify icon' />
                <img src={appleIcon} alt='apple icon' />
                <img src={bandcampIcon} alt='bandcamp icon' />
                <img src={instaIcon} alt='instagram icon' />
              </div>
            </div>
          </div>
        }


        <div className={`ib purchase-wrapper-wrapper ${this.state.currentPage === 'preorder' ? 'expanded' : 'collapsed'}`}>
          {this.state.currentPage === 'preorder' &&
            <StripeProvider apiKey="test_key_3vil_p3ngu1n_so_rand0m_lol">
              <PurchaseWrapper
                albumCover={albumCover}
                vinyl={vinyl}
              />
            </StripeProvider>
          }
        </div>
        {!isMobile && <Footer
          images={this.state.images}
          onEmailClick={this.onEmailClick}
          emailOut={this.state.emailOut}
          submittedEmail={this.state.submittedEmail}
          screenSize={this.state.screenSize}
          currentPage={this.state.currentPage}
          handlePageSwitch={this.handlePageSwitch}
        />}
      </div>
    );
  }
}

export default App;
