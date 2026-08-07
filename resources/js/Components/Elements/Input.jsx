import React from 'react'

const Input = (type, name, props) => {
  return (
    <div>
      <input type={`${type}`} name={`${name}`} {...props} />
    </div>
  )
}

export default Input
