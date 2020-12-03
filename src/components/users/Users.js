import React, { useContext } from 'react'
import { GithubContext } from '../../context/GithubContext'
import UserItem from './UserItem.js'
import Spinner from '../layout/Spinner'

function Users() {
  const context = useContext(GithubContext)

  const loading = context.values.loading
  const users = context.values.users

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
}

export default Users
