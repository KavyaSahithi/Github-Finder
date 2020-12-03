import React, { useContext } from 'react'
import { GithubContext } from '../../context/GithubContext'

const Alert = () => {
  const context = useContext(GithubContext)
  let alert = context.values.alert

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    )
  )
}

export default Alert
