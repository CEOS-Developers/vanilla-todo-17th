const toDoInput = document.querySelector("#todo_input");
const addBtn = document.querySelector(".todo_input > p");
const toDoList = document.querySelector('.todo_list');
const doneList = document.querySelector('.done_list');

let toDoItem = [];
let doneItem = [];

function addTodo(event){
    event.preventDefault();
    let toDoLi = document.createElement("li");
    let toDoText = document.createElement('p');
    let deleteBtn = document.createElement('button');

    toDoText.innerText = toDoInput.value;
    toDoText.addEventListener("click",moveToDo);

    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click",delToDo);

    toDoLi.appendChild(toDoText);
    toDoLi.appendChild(deleteBtn);

    toDoList.appendChild(toDoLi);
    toDoItem.push(toDoText.innerText);
}

function delToDo(event){
    let deleteItem = event.target.parentElement;
    let removedItem = deleteItem.parentElement.removeChild(deleteItem);
    return removedItem;
}

function moveToDo(event){
    let moveItem = event.target.parentElement;
    let parentClass = moveItem.parentElement.className;
    if(parentClass == "todo_list"){
        doneList.appendChild(delToDo(event));
    }
    else{
        toDoList.appendChild(delToDo(event));
    }
}
function init(){
    addBtn.addEventListener("click", addTodo);
}

init();