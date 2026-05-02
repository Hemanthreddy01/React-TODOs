import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { TodoContext } from './Contexts/todoContext'
import './App.css'
import { TodoForm, TodoItem } from './Components'

function App() {
  const [todos,setTods] =useState([])

  const AddTodo =(todo)=>{
    setTods((prev)=>[{id: Date.now(), ...todo},...prev])
  }

  const EditTodo=(id,todo)=>{
    setTods((prev)=>prev.map((prevTodo)=>(prevTodo.id=== id ? todo: prevTodo)))
  }


  const DeleteTodo=(id)=>{
    setTods((prev)=>prev.filter((prevTodo)=>prevTodo.id != id))
  }

  const ToggleComplete = (id)=>{
    setTods((prev)=> prev.map((prevTodo)=>prevTodo.id == id ? {...prevTodo ,complete : !prevTodo.complete} :prevTodo))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length>0){
      setTods(todos)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  return (
    <TodoContext.Provider value={{todos,AddTodo,EditTodo,DeleteTodo,ToggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                {/* Todo form goes here */} 
                <TodoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo)=>(
                  <div key={todo.id} className='w-full'>
                    <TodoItem  todo={todo}/>
                  </div>
                ))}
              </div>
          </div>
        </div>
    </TodoContext.Provider>
  )
}

export default App
