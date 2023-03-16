let todoItemsList = []; //todoList, doneList 모두 포함

const createTodoItem = () => {
  const todoList = document.getElementById('todo-list');
  const doneList = document.getElementById('done-list');

  todoList.innerHTML = ''; //todo 중복 방지 위한 초기화
  doneList.innerHTML = '';

  todoItemsList.forEach((item) => {
    const todoItem = document.createElement('li');

    const todoItemText = document.createElement('span');
    todoItemText.innerText = item.text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '✖';
    deleteButton.className = 'delete-button';

    todoItem.appendChild(todoItemText);
    todoItem.appendChild(deleteButton);

    if (!item.isDone) {
      //화면에 그려주기
      todoList.appendChild(todoItem);
    } else {
      doneList.appendChild(todoItem);
    }

    todoItemText.addEventListener('click', toggleTodo); //todo 클릭 시 toggle 함수

    deleteButton.addEventListener('click', removeTodo); //x 버튼 클릭 시 todo 삭제 함수
  });
};

const addTodo = (event) => {
  //todo 추가
  event.preventDefault();
  const inputTodo = {
    text: document.getElementById('input-todo').value,
    id: Date.now(),
    isDone: false,
  };

  if (inputTodo.text) {
    todoItemsList = [...todoItemsList, inputTodo];
    document.getElementById('input-todo').value = ''; //입력 창 초기화
    createTodoItem();
  }
};

const removeTodo = (removeitem) => {
  //todo 삭제
  const removedTodoList = todoItemsList.filter(
    (item) => item.text !== removeitem.target.parentNode.innerText.slice(0, -1)
  );
  todoItemsList = Array.from(removedTodoList); //todoItemsList update
  createTodoItem();
};

const toggleTodo = (toggleItem) => {
  //todo와 done 서로 toggle
  const toggledTodo = todoItemsList.find(
    (item) => item.text === toggleItem.target.innerText
  );
  toggledTodo.isDone = !toggledTodo.isDone; //isDone 상태 전환
  createTodoItem();
};
