const toDoInput = document.querySelector('#todo_input');
const addBtn = document.querySelector('.todo_input > p');
const toDoList = document.querySelector('.todo_list');
const doneList = document.querySelector('.done_list');
const toDoLen = document.querySelector('#todo_len');
const doneLen = document.querySelector('#done_len');

const toDoSpan = toDoList.getElementsByTagName("span");
const doneSpan = doneList.getElementsByTagName("span");

// todo list 한 줄 만드는 함수
function makeLi(value){
    let toDoLi = document.createElement("li");
    let toDoText = document.createElement('span');
    let deleteBtn = document.createElement('button');

    toDoText.innerText = value;
    toDoText.addEventListener("click",moveToDo);

    deleteBtn.innerText = "🗑";
    deleteBtn.addEventListener("click",delToDo);

    toDoLi.appendChild(toDoText);
    toDoLi.appendChild(deleteBtn);
    return toDoLi;
}

// localstorage에 저장된 데이터 불러오는 함수
function renderLists(){
    let toDoString = localStorage.getItem("toDoObject");
    let toDoItems = JSON.parse(toDoString);
    for(let toDoItem of toDoItems.toDo){
        toDoList.appendChild(makeLi(toDoItem));
    }
    for(let doneItem of toDoItems.done){
        doneList.appendChild(makeLi(doneItem));
    }
    returnLen();
}

// todo item 바뀔 때마다 localstorage에 저장하는 함수
function storeLists(){
    let toDoItems = [];
    let doneItems = [];
    for (let i = 0; i < toDoSpan.length; i++) {
        let value = toDoSpan[i].innerText;
        toDoItems.push(value);
    }
    for (let i = 0; i < doneSpan.length; i++) {
        let value = doneSpan[i].innerText;
        doneItems.push(value);
    }
    let toDoObject = {
        toDo : toDoItems,
        done : doneItems,
    }
    localStorage.setItem("toDoObject",JSON.stringify(toDoObject));
}

// todo, done item 개수를 갱신하는 함수
function returnLen(){
    toDoLen.innerHTML =  `To Do ! : ${toDoSpan.length}`;
    doneLen.innerHTML = `Done ! : ${doneSpan.length}`;
}

// todo목록에 item을 추가하는 함수
function addToDo(event){
    event.preventDefault();
    if(!toDoInput.value){
        alert("할 일을 입력해주세요.");
        return 0;
    }
    toDoList.appendChild(makeLi(toDoInput.value));
    
    toDoInput.value = '';
    returnLen();
    storeLists();
}

// 항목을 삭제하는 함수
function delToDo(event){
    let deleteItem = event.target.parentElement;
    let removedItem = deleteItem.parentElement.removeChild(deleteItem);
    returnLen();
    storeLists();
    return removedItem;
}

// 항목 클릭 시 반대편으로 이동시키는 함수
function moveToDo(event){
    let moveItem = event.target.parentElement;
    let parentClass = moveItem.parentElement.className;
    if(parentClass == "todo_list"){
        doneList.appendChild(delToDo(event));
    }
    else{
        toDoList.appendChild(delToDo(event));
    }
    returnLen();
    storeLists();
}

// 처음 실행 함수
function init(){
    renderLists();
    addBtn.addEventListener("click", addToDo);
    toDoInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          addToDo(event);
        }
    });
}

init();