import React, { SetStateAction } from 'react'

export interface ITodoItem {
  content: string
  createdAt: number
  isFinished: boolean
}

interface Props {
  todos: ITodoItem[]
  setTodos: (value: SetStateAction<ITodoItem[]>) => void
}

export default function TodoItem(props: Props) {
  const { todos, setTodos } = props

  const switchTodoStatus = (index: number) => {
    setTodos(todos => {
      const newTodos = [...todos]
      newTodos[index].isFinished = !newTodos[index].isFinished
      return newTodos
    })
  }

  return (
    <div>
      {
        todos.map((item, index) =>
          <section
            className={['shadow-md border-gray-500 p-4 mb-1 cursor-pointer', item.isFinished ? 'line-through bg-gray-100' : ''].join(' ')}
            key={item.createdAt}
            title={new Date(item.createdAt).toLocaleString()}
            onClick={() => switchTodoStatus(index)}
          >
            {item.content}
          </section>
        ).reverse()
      }
    </div>
  )
}