import React from 'react'

export default class Contact extends React.Component {
  render() {
    return (
      <div>
        <p className='bold'>CONTACT</p>
        <div className='contact-column'>
          <p className='bold'>GENERAL</p>
          <p>chris@itwasagooddream.com</p>
        </div>
        <div className='contact-column'>
          <p className='bold'>BOOKING</p>
          <p>booking@itwasagooddream.com</p>
        </div>
        <div className='contact-column'>
          <p className='bold'>LABEL</p>
          <p>wout@dunkrecords.com</p>
          <p>lucas@dunkrecords.com</p>
        </div>
      </div>
    )
  }
}