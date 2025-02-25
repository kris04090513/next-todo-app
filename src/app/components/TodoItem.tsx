"use client"; // 這是 Client Component

import styles from "../styles/TodoItem.module.scss";

interface TodoItemProps {
  id: number;
  text: string;
  createdAt:number;
  onDelete: (id: number) => void;
}

export default function TodoItem({ id, text, createdAt ,onDelete }: TodoItemProps) {
const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : "無效時間"; // 如果 createdAt 為 undefined，顯示"無效時間"

  // console.log("createdAt:", createdAt); // 🔍 確保這裡是 `number`
  return (
    <li className={styles.todoItem}>
      <span>{text}</span>
      <div className="flex justify-end px-2">{formattedDate}</div>
      <button onClick={() => onDelete(id)} className={styles.deleteButton}>刪除</button>
    </li>
  );
}
