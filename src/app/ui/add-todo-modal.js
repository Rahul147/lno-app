"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function AddTodoModal() {
  const wDate = useSearchParams().get('wdate')
  const [todo, setTodo] = useState({
    createdDate: new Date(),
    completed: false,
    wDate,
    title: '',
    category: 'leverage'
  })

  const updateTodoWithIdNew = async () => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
      const data = await response.json()
      window.location.reload()
    } catch (error) {
      console.error('Failed to update todo', error)
    }
  }

  const updateTodo = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  return <>
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Enter Activity</h3>

        <div className="modal-action">
          <select
            className="select select-warning w-1/8"
            name="category"
            onChange={(value) => updateTodo(value)}
            value={todo.category}
          >
            <option value={"leverage"} defaultChecked>L</option>
            <option value={"neutral"}>N</option>
            <option value={"overhead"}>O</option>
          </select>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-warning w-full"
            name="title"
            value={todo.name}
            onChange={(value) => updateTodo(value)}
          />

          <button className="btn" onClick={updateTodoWithIdNew} disabled={(todo.title == '') || (todo.category == '')}>Add</button>
        </div>

      </div >
    </dialog >
  </>
}