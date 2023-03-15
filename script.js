const plusIcon = document.querySelector('.plusBtn');
const submitBtn = document.querySelector('.submitBtn');
const hoverDiv = document.querySelector('.hoverDiv');
const mainDiv = document.querySelector('.mainDiv');
const todoDiv = document.querySelector('#todoDiv');
const doneDiv = document.querySelector('#doneDiv');
const inputTag = document.querySelector('.customInput');

const todoPlaceHolder = document.getElementById('todoPlaceHolder');

// plusIcon control
// plusIcon => hoverDiv
plusIcon.addEventListener('click', () => {
  mainDiv.classList.toggle('covered');
  hoverDiv.classList.toggle('covered');
  todoDiv.classList.toggle('covered');
  if (mainDiv.className !== 'mainDiv covered') {
    inputTag.value = '';
  }
});

// submitBtn control
// submitBtn => (localStorage) => mainDiv
const newList = JSON.parse(localStorage.getItem('todoList')) ?? [];
submitBtn.addEventListener('click', () => {
  const inputData = {
    title: inputTag.value,
    time: new Date(),
  };
  newList.push(inputData);
  localStorage.setItem('todoList', JSON.stringify(newList));
  inputTag.value = '';
  mainDiv.classList.toggle('covered');
  hoverDiv.classList.toggle('covered');
  location.reload();
});

function todoElemGen(data, queryDiv) {
  const todoElem = document.createElement('div');
  todoElem.className = `todoElem`;
  // React에서는 Map이나 forEach를 사용하는 경우 key값을 넣어주어야 하는데, html은 다른가?
  // todoElem.key = data.time;
  todoElem.id = data.time;
  let eslapsedTime = (new Date().getTime() - new Date(data.time)) / (1000 * 60);

  const todoTitleDiv = document.createElement('div');
  todoTitleDiv.className = 'todoTitle';
  todoTitleDiv.innerHTML = data.title;

  const todoTimeDiv = document.createElement('div');
  todoTimeDiv.className = 'todoTime';
  todoTimeDiv.innerHTML = timeCalculate(eslapsedTime);

  todoElem.append(todoTitleDiv, todoTimeDiv);
  queryDiv.appendChild(todoElem);

  todoElem.addEventListener('click', (e) => {
    todoClickControler(e, todoElem, queryDiv);
  });
}

function timeCalculate(time_num) {
  let eslapsedTime = time_num;
  let eslapsedHour = 0;
  let eslapsedDay = 0;
  while (eslapsedTime >= 60) {
    eslapsedHour += 1;
    eslapsedTime -= 60;
  }
  while (eslapsedHour > 24) {
    eslapsedDay += 1;
    eslapsedHour -= 24;
  }
  let timeString = '';
  if (eslapsedDay > 0) {
    timeString += `${eslapsedDay}d `;
  }
  if (eslapsedHour > 0) {
    timeString += `${eslapsedHour}h `;
  }
  if (1 <= eslapsedTime) {
    timeString += `${eslapsedTime.toFixed()}m`;
  }
  if (timeString === '') {
    timeString = 'just now';
  }
  return timeString;
}

function renderSubFunc(query) {
  let listName = query === 'todo' ? 'todoList' : 'doneList';
  let queryDiv = query === 'todo' ? todoDiv : doneDiv;
  if (localStorage.getItem(listName) !== null) {
    while (queryDiv.firstChild) {
      queryDiv.removeChild(queryDiv.firstChild).remove();
    }
  }
  if (mainDiv.className === 'mainDiv') {
    let Items = JSON.parse(localStorage.getItem(listName));
    if (Items) {
      Items.sort((a, b) => new Date(a.time) - new Date(b.time));
      Items.forEach((item) => todoElemGen(item, queryDiv));
    }
  }
}

// when plus btn not clicked
function renderList() {
  renderSubFunc('todo');
  renderSubFunc('done');
}

// div가 클릭되었을 때 그 div의 어느 부분을 클릭했는지 계산
function getClickRatio(div, e) {
  const rect = div.getBoundingClientRect();
  const width = rect.width;
  const x = e.clientX - rect.left;
  return x / width;
}

function todoClickControler(e, todoElem, queryDiv) {
  let clickratio = getClickRatio(todoElem, e);
  if (todoElem.classList.contains('scrollLeft')) {
    clickratio = clickratio - 0.3;
  } else if (todoElem.classList.contains('scrollRight')) {
    clickratio = clickratio + 0.3;
  }

  if (clickratio < 0.5) {
    if (todoElem.classList.contains('scrollRight')) {
      todoElem.classList.toggle('scrollRight');
    } else if (todoElem.classList.contains('scrollLeft')) {
      if (queryDiv === todoDiv) {
        deleteTodoElem(todoElem);
      } else {
        moveToTodoList(todoElem);
      }
    } else {
      todoElem.classList.toggle('scrollLeft');
    }
  } else {
    if (queryDiv === todoDiv) {
      if (todoElem.classList.contains('scrollLeft')) {
        todoElem.classList.toggle('scrollLeft');
      } else if (todoElem.classList.contains('scrollRight')) {
        moveToDoneList(todoElem);
      } else {
        todoElem.classList.toggle('scrollRight');
      }
    } else {
      if (todoElem.classList.contains('scrollLeft')) {
        todoElem.classList.toggle('scrollLeft');
      }
    }
  }
}

function moveToDoneList(todoElem) {
  let elemData = {
    title: todoElem.children[0].innerHTML,
    time: todoElem.id,
  };

  let todoList = JSON.parse(localStorage.getItem('todoList'));
  let doneList = JSON.parse(localStorage.getItem('doneList')) ?? [];
  let index = todoList.findIndex((item) => item.time === elemData.time);

  if (index !== -1) {
    todoList.splice(index, 1);
    doneList.push(elemData);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('doneList', JSON.stringify(doneList));
    renderList();
  }
}

function moveToTodoList(todoElem) {
  let elemData = {
    title: todoElem.children[0].innerHTML,
    time: todoElem.id,
  };

  let todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
  let doneList = JSON.parse(localStorage.getItem('doneList'));
  let index = doneList.findIndex((item) => item.time === elemData.time);

  if (index !== -1) {
    doneList.splice(index, 1);
    todoList.push(elemData);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('doneList', JSON.stringify(doneList));
    renderList();
  }
}

function deleteTodoElem(todoElem) {
  let todoList = JSON.parse(localStorage.getItem('todoList'));
  let index = todoList.findIndex((item) => item.time === todoElem.id);
  if (index !== -1) {
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
  renderList();
}

//처음에 함수 한번 호출
function init() {
  renderList();
  setInterval(renderList, 30000);
}

init();
