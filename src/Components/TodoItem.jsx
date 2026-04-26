import React, { useState } from 'react'
import { useTodo } from '../Contexts/todoContext';

function TodoItem({todo}) {
  
  const [todomsg,setTodoMsg] =useState(todo.todo)
  const [isTodoEditable,setIsTodoEditable]=useState(false)
  const {EditTodo,DeleteTodo,ToggleComplete} = useTodo()


  const editTodo= ()=>{
    EditTodo(todo.id,{...todo,todo:todomsg})
    setIsTodoEditable(false)
  }    

  const toggleCompleted = () =>{
    ToggleComplete(todo.id)
  }


  return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.complete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.complete}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.complete ? "line-through" : ""}`}
                value={todomsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.complete) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.complete}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => DeleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}


export default TodoItem