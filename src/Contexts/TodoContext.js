import { createContext, useContext } from "react";

export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:'write a mail',
            complete:false
        },
        
    ],
    AddTodo:(todo)=>{},
    EditTodo:(id,todo)=>{},
    DeleteTodo:(id)=>{},
    ToggleComplete:(id)=>{}

});

export const useTodo= () =>{
    return useContext(TodoContext)

}