import React, { Component } from 'react';
import PurchaseWrapper from './PurchaseWrapper';
import Footer from './Footer';
import { Tooltip } from 'react-tippy';
import albumCover from './images/IWAGD-Album-1.jpg'
import vinyl from './images/vinyl.png'
import './App.css';
import 'react-tippy/dist/tippy.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: window.innerWidth,
      currentPage: 'landing'
    }

    this.setScreenSize = this.setScreenSize.bind(this)
    this.handlePageSwitch = this.handlePageSwitch.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setScreenSize)
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

  render() {
    return (
      <div className="App" id='app'>
        <div className='ib landing-wrapper'>
          <div className='landing' />
        </div>
        <div className={`ib purchase-wrapper-wrapper ${this.state.currentPage === 'preorder' ? 'expanded' : 'collapsed'}`}>
          {this.state.currentPage === 'preorder' &&
            <PurchaseWrapper
              albumCover={albumCover}
              vinyl={vinyl}
            />
          }
        </div>
        <Footer
          screenSize={this.state.screenSize}
          currentPage={this.state.currentPage}
          handlePageSwitch={this.handlePageSwitch}
        />
      </div>
    );
  }
}

export default App;
