let todoItemsList = []; //todoList, doneList 모두 포함

const createTodoItem = () => {
  const todoList = document.getElementById('todo-list');
  const doneList = document.getElementById('done-list');

  todoList.innerHTML = ''; //todo 중복 방지 위한 초기화

  todoItemsList.forEach((item) => {
    const todoItem = document.createElement('li');

    const todoItemText = document.createElement('span');
    todoItemText.innerText = item.text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '✖';

    todoItem.appendChild(todoItemText);
    todoItem.appendChild(deleteButton);

    if (!item.isDone) {
      //화면에 그려주기
      todoList.appendChild(todoItem);
    } else {
      doneList.appendChild(todoItem);
    }
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
