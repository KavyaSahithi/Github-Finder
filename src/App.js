import './App.css'
import React from 'react'
import Navbar from './components/layout/Navbar'
import User from './components/users/User.js'
import Alert from './components/layout/Alert.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About.js'
import { GithubProvider } from './context/GithubContext'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

function App() {
  return (
    <Router>
      <GithubProvider>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => <User {...props} />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </GithubProvider>
    </Router>
  )
}

export default App
