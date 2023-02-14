'use client'
import React, { useState } from 'react'

export default function Page() {

  const [todos, setTodos] = useState([
    { thingsToDo: 'Start Learning Next Js', completed: true },
    { thingsToDo: 'Complete', completed: false }
  ]); /*thingsToDo and completed are two property of object stored in varibale todo */


  const onClickHandler = (myCb) => {

    const newThings = todos.map((todo) => {
      console.log('Things to do: ', todo)
      if (todo.thingsToDo == myCb.thingsToDo) {
        todo.completed = !todo.completed; {/*Change the value to the opposite of what is stored*/ }
      }
      return todo; //will give error if not returned as it is used for the elemet onClick
    });
    setTodos(newThings); //update the value of the new things when clicked upon
  };

  return (
    <>
      <div>

        <h1 style={{ color: 'black', backgroundColor: 'whitesmoke' }}>Welcome to Todo List App</h1>
        <input type="text" placeholder='Enter a task to add to the list' style={{ backgroundColor: 'peachpuff' }} />
        <button style={{ borderColor: 'darkblue' }}> Add task</button>

        <ul style={{ listStyle: 'none' }}>
          {
            todos.map((cb) => {
              return <li style={{ color: cb.completed ? 'green' : 'red' }}
                key={cb}>
                <input type="checkbox" checked={cb.completed} onClick={() => { onClickHandler(cb) }} />
                {cb.thingsToDo}

              </li>; {/*will give error if thingsToDo is added */ }
            })
          }
        </ul>
      </div>
    </>
  )
}
