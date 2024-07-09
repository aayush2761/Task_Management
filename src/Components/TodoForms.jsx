import React, { useState } from 'react'
import { useToDo } from '../Context/ToDoContext';

function TodoForms() {
    const [todo , setTodo] = useState("")
    const {addTodo}= useToDo()

    const add = (e) =>{
        e.preventDefault()

        if(!todo) return 

        addTodo({ todo, completed: false})
        setTodo ("")
    }

    return (
        <form  onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
                className="w-full border border-black/10 dark:border-white/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 dark:bg-black/20 py-1.5 text-black dark:text-white"

            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForms;

