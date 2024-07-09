import { useState, useEffect } from 'react';
import { ToDoProvider } from './Context/index';
import './App.css';
import TodoForms from './Components/TodoForms';
import TodoItems from './Components/TodoItems';
import ThemeBtn from './Components/ThemeButton';
import { ThemeProvider } from './Context copy/Theme.js';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Theme management
  const [themeMode, setThemeMode] = useState('dark');

  const lightTheme = () => {
    setThemeMode('light');
  };

  const darkTheme = () => {
    setThemeMode('dark');
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <ToDoProvider value={{ todos, addTodo, updateToDo, deleteTodo, toggleComplete }}>
        <div className={`min-h-screen py-8 ${themeMode === 'dark' ? 'bg-[#172842]' : 'bg-[#edf1f7]'}`}>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-8 mt-2">
                <h1 className={`text-2xl font-bold ${
                    themeMode === 'dark' ? 'text-white' : 'text-[#172842]'
                }`}>
                    Manage Your Todos
                </h1>
                <ThemeBtn />
            </div>
        </div>
            <div className="mb-4">
              <TodoForms />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItems todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ToDoProvider>
    </ThemeProvider>
  );
}

export default App;
