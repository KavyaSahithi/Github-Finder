import './App.css'
import React, { Component, Fragment } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users.js'
import User from './components/users/User.js'
import Search from './components/users/Search.js'
import axios from 'axios'
import Alert from './components/layout/Alert.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      user: {},
      repos: [],
      loading: false,
      alert: null,
    }
  }

  /*componentDidMount() {
    this.setState({ loading: true })
    axios
      .get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) =>
        this.setState({
          users: res.data,
          loading: false,
        })
      )
  }*/

  //search github users, html_url, html_url
  searchUsers = (text) => {
    this.setState({ loading: true })
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) =>
        this.setState({
          users: res.data.items,
          loading: false,
        })
      )
  }

  //Get single github user
  getUser = (username) => {
    this.setState({ loading: true })
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) =>
        this.setState({
          user: res.data,
          loading: false,
        })
      )
  }

  //Get user Repos
  getUserRepos = (username) => {
    this.setState({ loading: true })
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) =>
        this.setState({
          repos: res.data,
          loading: false,
        })
      )
  }

  //clearUsers from state
  clearUsers = () => this.setState({ users: [], loading: false })

  //Alert state
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, loading, user, repos } = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
