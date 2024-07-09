import React, { useState } from 'react'
import { useToDo } from '../Context';

function TodoItems({ todo }) {

    {/* check for editable or not */ }

    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg , setTodoMsg] = useState(todo.todo)

    const {updateToDo , deleteTodo , toggleComplete} = useToDo()
    

    const editTodo = () => {
        updateToDo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
      }
      const toggleCompleted = () => {
        //console.log(todo.id);
        toggleComplete(todo.id)
      }
    
      return (
        <div
            className={`flex border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm duration-300 text-black dark:text-white ${
                todo.completed ? 'bg-[#c6e9a7] dark:bg-[#4b6041]' : 'bg-[#ccbed7] dark:bg-[#574b5a]'
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? 'border-black/10 dark:border-white/10 px-2' : 'border-transparent'
                } ${todo.completed ? 'line-through' : ''}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 dark:border-white/10 justify-center items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? '📁' : '✏️'}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 dark:border-white/10 justify-center items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
    }
    
    export default TodoItems;