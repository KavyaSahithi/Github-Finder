import React, { useState, createContext } from 'react'
import axios from 'axios'

export const GithubContext = createContext()
let githubClientId
let githubClientSecret

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

export const GithubProvider = (props) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  //search github users, html_url, html_url
  const searchUsers = (text) => {
    setLoading(true)
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      )
      .then((res) => {
        setUsers(res.data.items)
        setLoading(false)
      })
  }

  //Get single github user
  const getUser = (username) => {
    setLoading(true)
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      )
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
  }

  //Get user Repos
  const getUserRepos = (username) => {
    setLoading(true)
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientSecret}`
      )
      .then((res) => {
        setRepos(res.data)
        setLoading(false)
      })
  }

  //clearUsers from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  //Alert state
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type })
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const context = {
    values: {
      user,
      users,
      repos,
      loading,
      alert,
    },
    funcs: {
      searchUsers,
      getUser,
      getUserRepos,
      clearUsers,
      showAlert,
    },
  }

  return (
    <GithubContext.Provider value={context}>
      {props.children}
    </GithubContext.Provider>
  )
}
