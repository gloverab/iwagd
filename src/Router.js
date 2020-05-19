import React from 'react'
import { HashRouter as Router, Route } from "react-router-dom"
import App from './App'
import Press from './Press'

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={App} />
    </Router>
  )
}

export default AppRouter