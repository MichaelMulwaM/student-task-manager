class Task {
    constructor(name, completed = false) {
        this.name = name;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

const taskInput =
    document.getElementById("task-input");
const addButton =
    document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = [];
let currentFilter = sessionStorage.getItem("currentFilter") || "all";

// Save 2 LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load 4rm LocalStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const savedData = JSON.parse(savedTasks);
        tasks = savedData.map(function(task) {
            return new Task(task.name, task.completed);
        });
    }
}

addButton.addEventListener("click", function () {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = new Task(taskName);

    tasks.push(newTask);

    saveTasks();
    displayTask();

    taskInput.value = "";
});

function displayTask() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const newTask = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.name;

         if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", function() {
            task.toggleComplete();
            saveTasks();
            displayTask();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1); // Remove from array
            saveTasks();
            displayTask();          // Redraw screen
        });