'use client'
import React, { useState } from 'react'

export default function Page() {

  const [todo, setTodo] = useState(""); //hook for adding task entered the text box

  const [todos, setTodos] = useState([
    { toDoText: 'Start Learning Next Js', completed: true },
    { toDoText: 'Complete to do list', completed: false }
  ]); /*thingsToDo and completed are two property of object stored in varibale todo */


  const onClickHandler = (meraElm: any) => {

    const newTodos = todos.map((todo) => {
      if (todo.toDoText == meraElm.toDoText) {
        todo.completed = !todo.completed; {/*Change the value to the opposite of what is stored*/ }
      }
      return todo; //will give error if not returned as it is used for the elemet onClick
    });
    setTodos(newTodos); //update the value of the new things when clicked upon
  };


  const addTodo = () => {
    const newTodo = { todoText: todo, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
  }

  return (
    <>
      <div>

        <h1 style={{ color: 'black', backgroundColor: 'whitesmoke' }}>Welcome to Todo List App</h1>

        <input placeholder='Enter a task to add to the list' value={todo} onChange={(e) => { setTodo(e.target.value) }} style={{ backgroundColor: 'peachpuff' }} />
        <button style={{ borderColor: 'darkblue' }} onClick={addTodo}> Add task</button>

        <ul style={{ listStyle: 'none' }}>
          {todos.map((elm) => {
            return (
              <>
                <li
                  style={{
                    color: elm.completed ? 'green' : 'red',
                    backgroundColor: 'gainsboro',
                    listStyle: 'none',
                  }}
                  key={elm.toDoText}
                >
                  <input
                    type="checkbox"
                    checked={elm.completed}
                    onChange={() => {
                      onClickHandler(elm)
                    }}
                  />
                  {elm.toDoText}

                </li>
              </>
            )
          })
          }
        </ul>
      </div>
    </>
  )
}

