"use client"

export function AddTodoButton() {
    return <button
        className="btn w-full border-amber-700 shadow-lg bg-amber-200"
        onClick={() => document.getElementById("my_modal_1").showModal()}
    >
        Add New
    </button>
}
