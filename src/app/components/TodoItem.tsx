"use client"; // 這是 Client Component

import styles from "../styles/TodoItem.module.scss";

interface TodoItemProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}

export default function TodoItem({ id, text, onDelete }: TodoItemProps) {
  return (
    <li className={styles.todoItem}>
      <span>{text}</span>
      <button onClick={() => onDelete(id)} className={styles.deleteButton}>刪除</button>
    </li>
  );
}
