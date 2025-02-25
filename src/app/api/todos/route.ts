import { NextResponse } from 'next/server'

let todos = [
  { id: 1, text: '學習 Next.js', createdAt: 1740466055485 },
  { id: 2, text: '建立待辦事項 UI', createdAt: 1740466067324 },
]

// ✅ 取得所有待辦事項 (GET /api/todos)
export async function GET() {
  return NextResponse.json(todos)
}

// ✅ 新增待辦事項 (POST /api/todos)
export async function POST(req: Request) {
  const { text } = await req.json()
  const newTodo = { id: Date.now(), text, createdAt: Date.now() }
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}

// ✅ 刪除待辦事項 (DELETE /api/todos/:id)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))

  todos = todos.filter((todo) => todo.id !== id)
  return NextResponse.json({ success: true })
}
