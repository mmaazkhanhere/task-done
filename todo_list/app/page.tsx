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
    const newTodo = { toDoText: todo, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
  }

  const deleteTodo = (meraTodo: any) => {
    const newTodos = todos.filter((todo) => {
      if (todo.toDoText == meraTodo.toDoText) return false;
      return true;
    });
    console.log("old todos", todos, "new todos", newTodos);
    setTodos(newTodos);
  };


  return (
    <>
      <div>Todo</div>
      <input
        placeholder="add todo text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((elm) => {
          return (
            <li
              style={{
                color: elm.completed ? "green" : "orange",
                fontStyle: "oblique",
                listStyle: "none",
              }}
              key={elm.toDoText}
            >
              <input
                type="checkbox"
                checked={elm.completed}
                onChange={() => {
                  onClickHandler(elm);
                }}
              />
              {elm.toDoText}
              <button
                onClick={() => {
                  deleteTodo(elm);
                }}
              >
                {"  "}
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

