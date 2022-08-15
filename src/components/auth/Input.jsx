import React from 'react'

const Input = (props) => {
  return (
    <div className="w-auto">
        <input {...props} className="bg-violet-50 shadow p-2 rounded-md w-full focus:outline-blue-100" required/>
        
    </div>
  )
}

export default Input