const toDoForm = document.getElementById('to-do-form');
const toDoInput = document.querySelector('input');
const toDoList = document.getElementById("todo-list")
const finishLi = document.getElementById('done-list');

toDoForm.addEventListener("submit", enterToDo);

//'해보자고! 리스트'로 할 일 저장하기
function enterToDo(event) {
    event.preventDefault();
    addToDo(toDoInput.value);
    toDoInput.value = "";
}

function addToDo(event) {
    const toDoSpan = document.createElement("span");
    toDoSpan.innerText = event;
  
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "👍";
    doneBtn.addEventListener("click", doneToDo);

    const newToDoList = document.createElement("li");
    newToDoList.append(toDoSpan, doneBtn);
    toDoList.append(newToDoList);
}

//'해보자고! 리스트'에서 클릭 시 '완료하기 리스트'로 이동시키기
function doneToDo(event) {
    const target = event.target.parentElement;
  
    const finishList = document.createElement("li");
    const finishSpan = document.createElement("span");
    const finishBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
  
    finishSpan.innerText = target.querySelector("span").innerText;
    finishBtn.innerText = "🧹";
    finishBtn.addEventListener("click", deleteToDo);
  
    returnBtn.innerText = "😭";
    returnBtn.addEventListener("click", returnToDo);

    finishList.appendChild(finishSpan);
    finishList.appendChild(finishBtn);
    finishList.appendChild(returnBtn);
    finishLi.append(finishList);
    target.remove();
}

//'완료하기 리스트'에서 '해보자고! 리스트'로 할 일 이동하기
function returnToDo(event) {
    const value = event.target.parentElement.querySelector("span").innerText;
    addToDo(value);
    deleteToDo(event);
}

//리스트에 있는 내역 삭제하기
function deleteToDo(event){
    event.target.parentElement.remove();
}

