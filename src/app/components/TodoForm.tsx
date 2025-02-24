"use client"; // 這是 Client Component

import { useState } from "react";
import styles from "../styles/TodoForm.module.scss";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return; // 防止空白輸入
    onAdd(input);
    setInput(""); // 清空輸入框
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <input
        type="text"
        placeholder="輸入待辦事項..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">新增</button>
    </form>
  );
}
