const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

let tasks = [];

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    errorMessage.textContent = "";

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const listItem = document.createElement("li");

        listItem.textContent = task.text;

        taskList.appendChild(listItem);
    });
}