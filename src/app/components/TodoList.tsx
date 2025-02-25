'use client' // 這是 Client Component

import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import styles from '../styles/TodoList.module.scss'

interface Todo {
  id: number
  text: string
  createdAt: number
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "學習 Next.js",createdAt:1740466055485 },
    { id: 2, text: "建立待辦事項 UI",createdAt:1740466067324 },
  ])

  // ✅ 從 API 取得待辦事項
useEffect(() => {
  fetch("/api/todos")
    .then((res) => res.json())
    .then((data: Todo[]) => {
      console.log("API 回傳的 todos:", data); // 🔍 確保 `createdAt` 存在
      setTodos(data);
    })
    .catch((err) => console.error("Error loading todos:", err));
}, []);


  // ✅ 新增待辦事項
  const addTodo = async (text: string) => {
    const newTodo: Todo = {
    id: Date.now(),
    text,
    createdAt: Date.now(), // 確保這裡有時間戳
  };

  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  if (res.ok) {
    const savedTodo = await res.json();
    setTodos([...todos, savedTodo]);
  }
  }

  // ✅ 刪除待辦事項
  const deleteTodo = async (id: number) => {
    const res = await fetch(`/api/todos?id=${id}`, { method: 'DELETE' })

    if (res.ok) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <div className={styles.todoContainer}>
      <h2>待辦事項</h2>
      <TodoForm onAdd={addTodo} />
      <ul className={styles.todoUlContainer}>
        {todos.map((todo) => (
   
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            createdAt={todo.createdAt}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  )
}
