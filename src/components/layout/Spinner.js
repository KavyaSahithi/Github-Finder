import React from 'react'
import spinner from './spinner.gif/spinner.gif'
import { Fragment } from 'react'

function Spinner() {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='Loading...'
        style={{ margin: 'auto', width: '200px', display: 'block' }}
      ></img>
    </Fragment>
  )
}
export default Spinner
