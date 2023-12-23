"use client"
import React, { useRef } from 'react'
import { createTodo } from "@/app/lib/actions"
import { useSearchParams } from 'next/navigation'

export function AddTodoModal() {
  const formRef = useRef(null)
  const wDate = useSearchParams().get('wdate')

  return <>
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Enter Activity</h3>

        <form ref={formRef} action={createTodo}>
          <div className="modal-action">
            <select className="select select-warning w-1/8" name="category">
              <option value={"leverage"} defaultValue>L</option>
              <option value={"neutral"}>N</option>
              <option value={"overhead"}>O</option>
            </select>
            <input type="text" placeholder="Type here" className="input input-bordered input-warning w-full" name="title" />
            <input name="wDate" defaultValue={wDate} hidden />

            <button className="btn" type="submit" onClick={() => formRef.current && formRef.current.requestSubmit()}>Add</button>
          </div>
        </form>

      </div >
    </dialog >
  </>
}