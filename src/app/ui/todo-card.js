"use client"
import { updateTodo } from "@/app/lib/actions"
import React, { useRef } from 'react';

function GenerateCheckList(item) {
  const formRef = useRef(null)

  const { title, completed, id } = item
  const updateTodoWithId = updateTodo.bind(null, id)

  return <div key={id}>
    <form ref={formRef} action={updateTodoWithId}>
      <div className="flex items-center mb-3" >
        <button type="submit">
          <input
            name="checked"
            type="checkbox"
            id={id}
            className="checkbox"
            defaultChecked={completed}
            onClick={() => formRef.current && formRef.current.requestSubmit()}
          />
        </button>
        <label className="ml-2 text-sm">{title}</label>
      </div>
    </form>
  </div>
}

export function TodoCard({ title, items, completion }) {
  return <>
    <div className="collapse collapse-arrow mb-3 border-grey-100 border" >
      <input type="radio" name="my-accordion-3" defaultChecked={title === "Leverage"} />
      <div className="collapse-title text-lg font-medium flex justify-between">
        <div><span className="text-xl text-amber-400 font-bold capitalize">{title[0]}</span> {title.substring(1)}</div>
        <div className="mr-3">
          <div
            className={`radial-progress text-xs text-amber-700 ${completion ? "border-1" : "border-8"}`}
            style={{ "--value": completion, "--size": completion ? "1.8rem" : "0rem" }}
            role="progressbar">
            {completion || ""}
          </div>
        </div>
      </div>
      <div className="collapse-content">
        {items.map(GenerateCheckList)}
      </div>
    </div >
  </>
}
