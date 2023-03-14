function moveToDone(todoTaskElement) {
  const newDoneTaskElement = todoTaskElement;

  const checkIcon = document.createElement("img");
  checkIcon.src = "./images/check.svg";

  //replace icon
  todoTaskElement.replaceChild(checkIcon, todoTaskElement.childNodes[0]);
  console.log(newDoneTaskElement);
  const doneLists = document.getElementsByClassName("tasks__done__content")[0];
  doneLists.appendChild(newDoneTaskElement);
}

function addTodo() {
  const input = document.getElementsByClassName("todo-input-box__input")[0];

  if (input.value === "") {
    //nothing happend when value is blank

    return;
  }
  const todoLists = document.getElementsByClassName("tasks__todo__content")[0];

  // 1. create list node

  const newTaskNode = document.createElement("li");

  const uncheckIcon = document.createElement("img");
  uncheckIcon.src = "./images/uncheck.svg";
  uncheckIcon.className = "icon__hover";
  uncheckIcon.onclick = function (e) {
    // moveToDone(e.target.parentElement);
  };
  newTaskNode.appendChild(uncheckIcon);

  const textNode = document.createTextNode(input.value);
  newTaskNode.appendChild(textNode);

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/delete.svg";
  deleteIcon.className = "icon__hover";

  deleteIcon.onclick = function (e) {
    e.target.parentElement.remove();
  };
  newTaskNode.appendChild(deleteIcon);

  // 2. append to parent container

  todoLists.appendChild(newTaskNode);

  console.log(newTaskNode);
  alert("add success");
  input.value = ""; //input flush
}

const inputBtn = document.getElementsByClassName("todo-input-box__icon")[0];
const input = document.getElementsByClassName("todo-input-box__input")[0];
inputBtn.onclick = input.onsubmit = addTodo;
