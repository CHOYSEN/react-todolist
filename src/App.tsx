import React, { useRef, useState, useEffect, KeyboardEvent } from 'react'

import TodoItem, { ITodoItem } from './TodoItem'

import { Add } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { Fab, Snackbar, TextField } from '@material-ui/core'

export default function App() {
  const [todos, setTodos] = useState<ITodoItem[]>([])
  const [showToast, setToastShow] = useState<boolean>(false)

  const inputElement = useRef<HTMLInputElement>()

  useEffect(() => {
    const todosMemory = localStorage.getItem('todos')
    todosMemory && setTodos(() => JSON.parse(todosMemory))

    window.addEventListener('keypress', focusInput)
    return () => window.removeEventListener('keypress', focusInput)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const focusInput = () => inputElement.current?.focus()

  const addTodo = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      event.stopPropagation()

      const content = inputElement.current?.value
      if (!content) {
        focusInput()
        setToastShow(() => true)
      } else {
        setTodos(todos => [{
          content,
          isFinished: false,
          createdAt: Date.now()
        }, ...todos])
        inputElement.current!.value = ''
      }
    }
  }

  return <>
    <main className="max-w-400px m-auto py-20">
      <TextField className="w-full !mb-5" inputProps={{ ref: inputElement, onKeyPress: addTodo }} label="Add a item!" />
      <TodoItem todos={todos} setTodos={setTodos}></TodoItem>
    </main>

    <Snackbar open={showToast} autoHideDuration={3000} onClose={() => setToastShow(() => false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="error">Todo content can not be empty</Alert>
    </Snackbar>

    <Fab className="!absolute bottom-10 right-10" color="primary" title="Add one!" aria-label="add" onClick={focusInput}>
      <Add />
    </Fab>
  </>
}