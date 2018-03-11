import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import PurchaseWrapper from './PurchaseWrapper';
import Footer from './Footer';
import { Tooltip } from 'react-tippy';
import albumCover from './images/album-art-350px.jpg'
import vinyl from './images/vinyl.png'
import { StripeProvider } from 'react-stripe-elements';
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect'
import spotifyIcon from './images/spotify-icon-rgb-white.svg';
import appleIcon from './images/shape.svg';
import bandcampIcon from './images/bandcamp-logo.svg';
import instaIcon from './images/3-layers.svg';
import soundOn from './images/noun_1583080_cc.svg';
import soundOff from './images/noun_1583083_cc.svg';
import arrow from './images/arrow.svg';
import intro from './audio/glitchy-vid-aud.mp3'
import MailchimpSubscribe from "react-mailchimp-subscribe";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: window.innerWidth,
      currentPage: 'landing',
      audioMuted: false,
      overlayImage: true,
    }

    this.playFirst = this.playFirst.bind(this)
    this.playSecond = this.playSecond.bind(this)
    this.toggleAudio = this.toggleAudio.bind(this)
    this.hideOverlay = this.hideOverlay.bind(this)
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
    setTimeout(this.hideOverlay, 2000)
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

  playFirst() {
    this.firstAud.audioEl.currentTime = 0;
    this.firstAud.audioEl.play();
  }

  playSecond() {
    this.secondAud.audioEl.currentTime = 0;
    this.secondAud.audioEl.play();
  }

  toggleAudio() {
    this.setState({ audioMuted: !this.state.audioMuted})
  }

  hideOverlay() {
    this.setState({ overlayImage: false })
  }

  render() {
    const url = "https://birdlabrecords.us17.list-manage.com/subscribe/post?u=5f414c713408a33c6eddaac3f&id=f9ce0dc3ce"
    const SimpleForm = () => <MailchimpSubscribe url={url}/>
    const socialLinks = () =>
      <div className='social-wrapper'>
        <a href='https://open.spotify.com/artist/3ib3FBBRjLNrucyXI6Jt6o?si=qU8KXG7SQD21Yf0pXwhm6Q' target='blank'>
          <img src={spotifyIcon} alt='spotify icon' />
        </a>
        <a href='https://itunes.apple.com/us/album/forgetting-how-to-speak-single/1356458807' target='blank'>
          <img src={appleIcon} alt='apple icon' />
        </a>
        <a href='http://itwasagooddream.bandcamp.com' target='blank'>
          <img src={bandcampIcon} alt='bandcamp icon' />
        </a>
        <a href='https://www.instagram.com/itwasagooddream/' target='blank'>
          <img src={instaIcon}  alt='instagram icon' />
        </a>
      </div>

    return (
      <div className={`App ${isMobile ? 'locked' : ''}`} id='app'>
        {!isMobile &&
          <div className="video-background">
            <div className="video-foreground">
              <iframe
                src="https://www.youtube.com/embed/7D8nz15PlR8?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=7D8nz15PlR8" />
            </div>
          </div>}
        {/* this.state.overlayImage && <div className='image-overlay-wrapper' />*/}
        {(this.state.emailOut || this.state.submittedEmail) && <div className='hit-box' onClick={this.onEmailClick} />}
        {isMobile && <h2 className='mobile-header'>IT WAS A GOOD DREAM</h2>}
        {isMobile &&
          <div className='mobile-center-wrap'>
            <div className={`bottom ${this.state.emailOut ? 'grow' : ''}`}>
              <div className={`mobile-email-wrapper ${this.state.emailOut ? 'grow' : ''}`}>
                {!this.state.emailOut && <button className='btn big mobile' id='mobile-email-btn' onClick={this.onEmailClick}>DON'T LOSE TOUCH</button>}
                {this.state.emailOut && SimpleForm()}
              </div>
              {!this.state.emailOut && socialLinks()}
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
        {!isMobile &&
          <div className='audio-control-wrapper'>
            <img
              src={this.state.audioMuted ? soundOn : soundOff}
              onClick={this.toggleAudio}
              className='audio-control'
            />
          </div>
        }
        <ReactAudioPlayer
          src={intro}
          muted={this.state.audioMuted}
          listenInterval={57000}
          onListen={this.playSecond}
          autoPlay
          ref={(e) => { this.firstAud = e; }}
        />
        <ReactAudioPlayer
          src={intro}
          muted={this.state.audioMuted}
          listenInterval={57000}
          onListen={this.playFirst}
          autoPlay={false}
          ref={(e) => { this.secondAud = e; }}
        />
        {!isMobile && this.state.currentPage === 'landing' &&
          <div className='social-wrapper-wrapper'>
            {socialLinks()}
          </div>}
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
