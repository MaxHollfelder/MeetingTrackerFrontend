import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login-page/Login'
import Schedule from './Schedule/index'
import Candidate from './Candidate/index'
import 'antd/dist/antd.css'

ReactDOM.render(
  <Router>
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/candidate" component={Candidate} />
      <Route path="/schedule" component={Schedule} />
    </div>
  </Router>,
  document.getElementById('root')
)