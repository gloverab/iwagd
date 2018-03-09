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
import arrow from './images/arrow.svg';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import './App.css';
import 'react-tippy/dist/tippy.css';

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
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setScreenSize)
    if (isMobile) {
      document.body.classList.add('locked')
    }
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

  handleEmailInput(e) {
    this.setState({
      email: e.currentTarget.value
    })
  }

  handleEmailSubmit(e) {
    e.preventDefault()
    const submittedEmail = document.getElementById('email-input').value
    var url = "https://script.google.com/macros/s/AKfycbzWlbq9PlJzHHvr8Ehu-kMVoqxqS5xUVewkX-Dnv2Tm5CihKqxa/exec"
    var xhr = new XMLHttpRequest()
    var data = { email: submittedEmail }
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        // document.getElementById("thankyou_message").style.display = "block";
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
    this.setState({
      submittedEmail,
      email: '',
    })
  }

  render() {
    const url = "https://birdlabrecords.us17.list-manage.com/subscribe/post?u=5f414c713408a33c6eddaac3f&id=f9ce0dc3ce"
    const SimpleForm = () => <MailchimpSubscribe url={url}/>

    return (
      <div className={`App ${isMobile ? 'locked' : ''}`} id='app'>
        {(this.state.emailOut || this.state.submittedEmail) && <div className='hit-box' onClick={this.onEmailClick} />}
        {isMobile && <h2 className='mobile-header'>IT WAS A GOOD DREAM</h2>}
        {isMobile &&
          <div className='mobile-center-wrap'>
            <div className={`bottom ${this.state.emailOut ? 'grow' : ''}`}>
              <div className={`mobile-email-wrapper ${this.state.emailOut ? 'grow' : ''}`}>
                {!this.state.emailOut && <button className='btn big mobile' id='mobile-email-btn' onClick={this.onEmailClick}>DON'T LOSE TOUCH</button>}
                {this.state.emailOut && SimpleForm()}
              </div>
              {!this.state.emailOut &&
                <div className='social-wrapper'>
                  {/* <img src={spotifyIcon} alt='spotify icon' />
                  <img src={appleIcon} alt='apple icon' />
                  <img src={bandcampIcon} alt='bandcamp icon' /> */}
                  <a href='instagram://user?username=itwasagooddream'><img src={instaIcon}  alt='instagram icon' /></a>
                </div>}
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
