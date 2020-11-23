import React from 'react'
import spinner from './spinner.gif/spinner.gif'
import { Fragment } from 'react'

function Spinner() {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='Loading...'
        style={{
          width: '200px',
          margin: 'auto',
          display: 'block',
          alignContent: 'center',
        }}
      ></img>
    </Fragment>
  )
}
export default Spinner
