const toDoInput = document.querySelector('#todo_input');
const addBtn = document.querySelector('.todo_input > p');
const toDoList = document.querySelector('.todo_list');
const doneList = document.querySelector('.done_list');

function addToDo(event){
    event.preventDefault();
    if(!toDoInput.value.trim()){
        alert("할 일을 입력해주세요.");
        return 0;
    }
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
    
    toDoInput.value = '';
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
    addBtn.addEventListener("click", addToDo);
    toDoInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          addToDo(event);
        }
    });
}

init();