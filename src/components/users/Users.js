import React from 'react'
import UserItem from './UserItem.js'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

function Users(props) {
  return (
    <div style={userStyle}>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {props.users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
}

export default Users
