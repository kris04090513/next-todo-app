"use client"; // 這是 Client Component

import { useState,useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import styles from "../styles/TodoList.module.scss";

interface Todo {
  id: number;
  text: string;
}

export default function TodoList() {
   const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "學習 Next.js" },
    { id: 2, text: "建立待辦事項 UI" },
  ]);

  // ✅ 從 API 取得待辦事項
  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(setTodos)
      .catch(err => console.error("Error loading todos:", err));
  }, []);

   // ✅ 新增待辦事項
  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    }
  };

  // ✅ 刪除待辦事項
  const deleteTodo = async (id: number) => {
    const res = await fetch(`/api/todos?id=${id}`, { method: "DELETE" });

    if (res.ok) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  return (
    <div className={styles.todoContainer}>
      <h2>待辦事項</h2>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} id={todo.id} text={todo.text} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}
