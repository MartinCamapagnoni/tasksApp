import getDate from "../utils/getDate.js"
import isNearDeadline from "../utils/isNearDeadline.js"

window.onload = () => {
    const toDoTasksContainer = document.querySelector("#toDoTasksContainer")
    const doingTasksContainer = document.querySelector("#doingTasksContainer")
    const doneTasksContainer = document.querySelector("#doneTasksContainer")

    fetch("../mocks/tasks.json")
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("tasks", JSON.stringify(res))

        const toDoTasks = res.filter(task => task.section === "toDo")
        const doingTasks = res.filter(task => task.section === "doing")
        const doneTasks = res.filter(task => task.section === "done")

        setNumberOfTasks("toDo", toDoTasks.length)
        setNumberOfTasks("doing", doingTasks.length)
        setNumberOfTasks("done", doneTasks.length)

        toDoTasksContainer.innerHTML = toDoTasks.map(task => (
            `<div onclick="openTask(${task.id})" class="d-flex justify-content-center mb-2 task-container" data-bs-toggle="modal" data-bs-target="#taskModal">
                <div class="card" style="width: 18rem; padding: 0.5rem">
                    <div class="card-body position-relative">
                        <h4 class="card-title">${task.name}</h4>
                        <h6 class="position-absolute bottom-0 end-0 m-1 fs-4" ${isNearDeadline(getDate(task.created)) && 'style="color: red"'}>${task.created}</h6>
                    </div>
                </div>
            </div>`
        )).join("")

        doingTasksContainer.innerHTML = doingTasks.map(task => (
            `<div onclick="openTask(${task.id})" class="d-flex justify-content-center mb-2 task-container" data-bs-toggle="modal" data-bs-target="#taskModal">
                <div class="card" style="width: 18rem; padding: 0.5rem">
                    <div class="card-body position-relative">
                        <h4 class="card-title">${task.name}</h4>
                        <h6 class="position-absolute bottom-0 end-0 m-1 fs-4" ${isNearDeadline(getDate(task.created)) && 'style="color: red"'}>${task.created}</h6>
                    </div>
                </div>
            </div>`
        )).join("")

        doneTasksContainer.innerHTML = doneTasks.map(task => (
            `<div onclick="openTask(${task.id})" class="d-flex justify-content-center mb-2 task-container" data-bs-toggle="modal" data-bs-target="#taskModal">
                <div class="card" style="width: 18rem; padding: 0.5rem">
                    <div class="card-body position-relative">
                        <h4 class="card-title">${task.name}</h4>
                        <h6 class="position-absolute bottom-0 end-0 m-1 fs-4" ${isNearDeadline(getDate(task.created)) && 'style="color: red"'}>${task.created}</h6>
                    </div>
                </div>
            </div>`
        )).join("")
    })
}

function openTask(taskId) {
    localStorage.setItem("openedTaskId",taskId)
}

document.addEventListener("shown.bs.modal", () => {
    const taskModal = document.querySelector("#taskModal")
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const openedTaskId = Number(localStorage.getItem("openedTaskId"))
    const task = tasks.find(task => task.id === openedTaskId)
    taskModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${task.name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6>Description</h3>
                <p>${task.description}</p>
                <hr>
                <h6>Comments</h3>
                    <ul>                     
                    ${
                        task.comments.map(comment => (
                            `
                                <li>${comment}</li>
                            `
                        ))
                    }
                    </ul>
                <hr>
                <p style="text-align: end;">${task.created}</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>`
})

function setNumberOfTasks(type, number) {
    switch(type) {
        case "toDo":
            const toDoSpan = document.getElementById("numberTasksToDo")
            toDoSpan.textContent = "(" + number + ")"
            break
        case "doing":
            const doingSpan = document.getElementById("numberTasksDoing")
            doingSpan.textContent = "(" + number + ")"
            break
        case "done":
            const doneSpan = document.getElementById("numberTasksDone")
            doneSpan.textContent = "(" + number + ")"
            break
    }
}