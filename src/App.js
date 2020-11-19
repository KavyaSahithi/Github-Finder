import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users.js'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      loading: false,
    }
  }
  componentDidMount() {
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
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
