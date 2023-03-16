const toDoInput = document.querySelector("#todo_input");
const addBtn = document.querySelector(".todo_input > p");
const toDoList = document.querySelector('.todo_list');
const doneList = document.querySelector('.done_list');

let toDoItem = [];
let doneItem = [];

function addTodo(target,text){
    let toDoLi = document.createElement("li");
    let toDoText = document.createElement('p');
    let deleteBtn = document.createElement('button');

    toDoText.innerText = toDoInput.value;

    deleteBtn.innerText = "X";

    toDoLi.appendChild(toDoText);
    toDoLi.appendChild(deleteBtn);

    toDoList.appendChild(toDoLi);

    toDoItem.push(toDoText.innerText);
        
}

function init(){
    addBtn.addEventListener("click", addTodo);
}

init();