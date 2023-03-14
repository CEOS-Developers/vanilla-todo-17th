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
    moveToDone(e.target.parentElement);
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

  input.value = ""; //input flush
}

const inputBtn = document.getElementsByClassName("todo-input-box__icon")[0];
const input = document.getElementsByClassName("todo-input-box__input")[0];
inputBtn.onclick = () => {
  inputBtn.classList.remove("rotate__anim");
  /*
  [ 투두 입력 완료시 벚꽃 버튼 돌아가게 하는 효과 ]  
  이 부분 왜 제대로 동작하지 않는지 (?) 잘 모르겠어요..!
  최초 실행때는 잘 돌아가는데, 그 이후 실행 때는 제대로 동작하지 않네요 ㅜ.ㅜ 
   */

  inputBtn.classList.add("rotate__anim");

  addTodo();
};
input.onsubmit = addTodo;
