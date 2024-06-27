import React, { useState } from 'react'

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState([])

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    }
    const addTask = (eventKey) => {
        if (eventKey === "Enter" && newTask.trim().length > 0) {
            setTasks(t => [...t, newTask])
            setNewTask("")
        }
    }
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => index !== i))
        setCompletedTasks(t => [...t, tasks[index]])
    }
    const returnTask = (index) => {
        setTasks(t => [...t, completedTasks[index]])
        setCompletedTasks(completedTasks.filter((_, i) => index !== i))
    }
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = // explore why this doesnt work when line 48 span className is an empty string
            [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    const moveTaskDown = (index) => {
        if (index < tasks.length-1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] =
            [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks); 
        }
    }
    const trashTask = (index) => {
        setCompletedTasks(completedTasks.filter((_, i) => index !== i))
    }

    return (
        <div className='to-do-list'>
            <div className='header-input-container'>
                <h1>To-Do List</h1>
                <div className='input-add-container'>
                    <input  type="text"
                            placeholder="Enter a task"
                            value={newTask}
                            onChange={handleInputChange}
                            onKeyDown={(event) => addTask(event.key)}/>
                    <button className='add-button'
                            onClick={() => addTask("Enter")}>
                        ➕
                    </button>
                </div>
            </div>
            <ol className='task-list'>
                <h3>In-Progress Tasks</h3>
                {tasks.length === 0 && <p>*No Tasks to Display!</p>}
                {tasks.map((task, index) =>
                <li key={index}>
                    <span className='task-text'>{index+1}. {task}</span>
                    <button className='delete-button'
                            onClick={() => deleteTask(index)}>
                        ✔️
                    </button>
                    <button className='move-button'
                            onClick={() => moveTaskUp(index)}>
                        ⬆
                    </button>
                    <button className='move-button'
                            onClick={() => moveTaskDown(index)}>
                        ⬇
                    </button>
                </li>)}
            </ol>
            <ol className='completed-list'>
                <h3>Completed Tasks</h3>
                {completedTasks.length === 0 && <p>*No Tasks to Display!</p>}
                {completedTasks.map((task, index) =>
                <li key={index}>
                    <span className='task-text'>{task}</span>
                    <button className='return-button'
                            onClick={() => returnTask(index)}>
                        ↩️
                    </button>
                    <button className='trash-button'
                            onClick={() => trashTask(index)}>
                        ❌
                    </button>
                </li>)}
            </ol>
        </div>
    )
}

export default ToDoList