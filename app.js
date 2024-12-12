//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

var taskTextInput = document.querySelector(".task-list__text-input_new-task");
var newTaskButton = document.querySelector(".add-new-task__button");
var incompleteTasksList = document.querySelector(".incomplete-tasks");
var completedTasksList = document.querySelector(".completed-tasks");

const createNewTaskElement = function(text) {

  let taskLine = document.createElement("li");
  taskLine.classList.add("task-line");

  let checkInput = document.createElement("input");
  checkInput.classList.add("task-line__check-input");
  checkInput.type = "checkbox";

  let labelForText = document.createElement("label");
  labelForText.classList.add("task-text", "task-line__label-for-text");
  labelForText.innerText = text;

  let textInput = document.createElement("input");
  textInput.classList.add("task-text", "task-list__text-input", "task-list__text-input_hidden");
  textInput.type = "text";

  let editTaskButton = document.createElement("button");
  editTaskButton.classList.add("button", "edit-task__button");
  editTaskButton.innerText = "Edit";

  let deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("button", "delete-task__button");

  let deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add('delete-task__button_img');
  deleteButtonImg.src = "./remove.svg";

  taskLine.appendChild(checkInput);
  taskLine.appendChild(labelForText);
  taskLine.appendChild(textInput);
  taskLine.appendChild(editTaskButton);
  taskLine.appendChild(deleteTaskButton);
  deleteTaskButton.appendChild(deleteButtonImg);

  return taskLine;
};

const addTask = function() {

  if (!taskTextInput.value) return;

  let listItem = createNewTaskElement(taskTextInput.value);
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskTextInput.value="";
};

newTaskButton.addEventListener("click", addTask);

const editTask = function() {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".task-list__text-input");
  let labelForText = listItem.querySelector(".task-line__label-for-text");
  let editTaskButton = listItem.querySelector(".edit-task__button");
  let containsClass = listItem.classList.contains("task-line_edit");

  if (containsClass) {
    labelForText.innerText = editInput.value;
    editTaskButton.innerText = "Edit";
    labelForText.classList.remove("task-line__label-for-text_hidden");
    editInput.classList.remove("task-list__text-input_edit");
  } else {
    editInput.value = labelForText.innerText;
    editTaskButton.innerText = "Save";
    labelForText.classList.add("task-line__label-for-text_hidden");
    editInput.classList.add("task-list__text-input_edit");
  }
  listItem.classList.toggle("task-line_edit");
  editInput.classList.toggle("task-list__text-input_hidden");
};

const deleteTask = function() {
  let listItem = this.parentNode;
  let taskList = listItem.parentNode;
  taskList.removeChild(listItem);
}

const taskCompleted = function() {
  let listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  listItem.classList.add("task-line__label-for-text_completed");
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  let listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  listItem.classList.remove("task-line__label-for-text_completed");
  bindTaskEvents(listItem, taskCompleted);
}

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".task-line__check-input");
  let editButton = taskListItem.querySelector(".edit-task__button");
  let deleteButton = taskListItem.querySelector(".delete-task__button");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTasksList.children.length; i++){
  bindTaskEvents(incompleteTasksList.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++){
  bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}