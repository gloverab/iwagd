import React, { Component } from 'react';
import Footer from './Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: window.innerWidth
    }

    this.setScreenSize = this.setScreenSize.bind(this)
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

  render() {
    return (
      <div className="App" id='app'>

        <Footer
          screenSize={this.state.screenSize}
        />
      </div>
    );
  }
}

export default App;
