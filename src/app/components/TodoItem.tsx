'use client' // 這是 Client Component
import styles from '../styles/TodoItem.module.scss'

interface TodoItemProps {
  id: number
  text: string
  createdAt: number
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({
  id,
  text,
  createdAt,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : '無效時間' // 如果 createdAt 為 undefined，顯示"無效時間"


  return (
    <li
      className={`${styles.todoItem} ${completed ? styles.completed : ''}`}
     >
      <input
        type="checkbox"
        checked={completed} 
        onChange={() => onToggle(id)}
      />
      <span>{text}</span>
      <div className="flex justify-end px-2">{formattedDate}</div>
      <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} className={styles.deleteButton}>
        刪除
      </button>
    </li>
  )
}
