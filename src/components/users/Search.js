import React, { useState, useContext } from 'react'
import { GithubContext } from '../../context/GithubContext'

function Submit() {
  const [text, setText] = useState('')

  const context = useContext(GithubContext)

  let clearUsers = context.funcs.clearUsers
  let showClear = context.values.users.length > 0 ? true : false
  let setAlert = context.funcs.showAlert
  let searchUsers = context.funcs.searchUsers

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (text === '') {
      setAlert('Please enter something!', 'light')
    } else {
      searchUsers(text)
      setText('')
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          name='text'
          value={text}
          placeholder='Search Users...'
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear === true && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  )
}

export default Submit
