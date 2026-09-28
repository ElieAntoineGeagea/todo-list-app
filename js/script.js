const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

let tasks = [];

loadTasks();
renderTasks();

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

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const listItem = document.createElement("li");

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("task-buttons");

        const completeButton = document.createElement("button");
        completeButton.type = "button";

        if (task.completed) {
            completeButton.textContent = "Undo";
        } else {
            completeButton.textContent = "Complete";
        }

        completeButton.addEventListener("click", function() {
            toggleTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        buttonGroup.appendChild(completeButton);
        buttonGroup.appendChild(deleteButton);

        listItem.appendChild(taskText);
        listItem.appendChild(buttonGroup);

        taskList.appendChild(listItem);
    });
}

function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }
}