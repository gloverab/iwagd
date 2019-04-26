import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import App from './App'
import About from './About'
import Contact from './Contact'

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={App} />
    </Router>
  )
}

export default AppRouter