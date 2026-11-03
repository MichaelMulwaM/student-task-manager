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

addButton.addEventListener("click", function () {
    
    const taskName = taskInput.value;

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = taskName;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        newTask.remove();
    });

    newTask.appendChild(taskText);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

    taskInput.value = "";
});

