import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import CheckboxView from "./components/Checkbox"
const API_BASE = "http://localhost:3000"

type todoType = {
  _id: string
  text: string,
  complete: boolean,
  timestamp: string
}

function App() {
  const [todos, setTodos] = useState<todoType[] | []>([]);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    axios.get(API_BASE + '/todo')
      .then(response => setTodos(response.data))
  }, [])

  async function updateTodo(id: string) {
    const updatedTodo = await axios.patch(API_BASE + '/todo/complete/' + id)

    setTodos((prevState) => (
      prevState.map(todo => {
        if (todo._id == updatedTodo.data._id) {
          todo.complete = updatedTodo.data.complete
        }
        return todo;
      }))
    )
  }

  async function deleteTodo(id: string) {
    await axios.delete(API_BASE + '/todo/delete/' + id)

    setTodos((prevState) => (
      prevState.filter(todo => todo._id != id)
    ))
  }

  function cancelAdd() {
    setTodoInput("")
    setDisplayAdd(false)
  }

  async function addTodo() {
    const newTodo = await axios.post(API_BASE + "/todo/new", 'text='+todoInput, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
    setTodos((prevState: todoType[]) => [...prevState, newTodo.data])
    setTodoInput("")
    setDisplayAdd(false)
  }

  return (
    <div className="App">
      <div className='checkbox-container'>
        <div className='header'> TodoList </div>

        {todos.map((todo, index) => (<CheckboxView key={todo._id} id={todo._id} value={todo.text} isChecked={todo.complete} updateTodoFunc={updateTodo} deleteTodoFunc={deleteTodo} />))}

        <div className='checkbox' style={{backgroundColor: '#0d295f', padding:'0.65rem 0.8rem', display: displayAdd ? 'flex' : 'none'}}>
          <input type="checkbox" disabled={true} />
          <input type="text" className='new-todo' style={{transform: 'scale(1)', margin: '0 0 0 0.8rem'}} value={todoInput} onChange={(e) => setTodoInput(e.target.value)} placeholder='New Todo' autoFocus={displayAdd} />
          <button className='cancel-btn'  onClick={cancelAdd}> Cancel </button>
          <button className='add-add-btn' onClick={addTodo}> Add </button>
        </div>

      </div>
      <button className='add-btn' onClick={() => {setDisplayAdd(true)}}>+ Add Todo</button>

    </div>
  )
}

export default App
