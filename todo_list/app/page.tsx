import React, { useState } from 'react'

export default function Page() {


  return (
    <div>
      <h1 style={{ color: 'black', backgroundColor: 'whitesmoke' }}>Welcome to Todo List App</h1>
      <input type="text" placeholder='Enter a task to add to the list' style={{ backgroundColor: 'peachpuff' }} />
      <button style={{ borderColor: 'darkblue' }}> Add task</button>
    </div>
  )
}
