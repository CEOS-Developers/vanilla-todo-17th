// elements
const plusIcon = document.querySelector('.plusBtn');
const submitBtn = document.querySelector('.submitBtn');
const hoverDiv = document.querySelector('.hoverDiv');
const mainDiv = document.querySelector('.mainDiv');
const todoDiv = document.querySelector('#todoDiv');
const doneDiv = document.querySelector('#doneDiv');
const inputTag = document.querySelector('.customInput');
const tagList = document.querySelectorAll('.tagDiv > div > span');
const todoPlaceHolder = document.getElementById('todoPlaceHolder');

// variables
const tagNames = [
  'tagRed',
  'tagBlue',
  'tagOrange',
  'tagYellow',
  'tagGreen',
  'tagPurple',
];
const newList = JSON.parse(localStorage.getItem('todoList')) ?? [];

// EventListeners
// plusIcon control
plusIcon.addEventListener('click', () => {
  mainDiv.classList.toggle('covered');
  hoverDiv.classList.toggle('covered');
  todoDiv.classList.toggle('covered');
  if (mainDiv.className !== 'mainDiv covered') {
    inputTag.value = '';
  }
});

// tagBtn control
tagList.forEach((tag) => {
  tag.addEventListener('click', () => {
    tagList.forEach((whiteTag) => {
      whiteTag.classList.remove('whiteRing');
    });
    tagNames.forEach((tagName) => {
      if (tag.classList.contains(tagName)) {
        tag.classList.toggle('whiteRing');
      }
    });
  });
});

// submitBtn control
// submitBtn => (localStorage) => mainDiv
submitBtn.addEventListener('click', () => {
  const whiteRingTag = document.querySelector('.whiteRing');
  if (inputValidation()) {
    const inputData = {
      title: inputTag.value,
      type: whiteRingTag.classList[0],
      time: new Date(),
    };
    newList.push(inputData);
    localStorage.setItem('todoList', JSON.stringify(newList));
    inputTag.value = '';
    mainDiv.classList.toggle('covered');
    hoverDiv.classList.toggle('covered');
    location.reload();
  }
});

// functions
function inputValidation() {
  inputTag.value = inputTag.value.trim();
  inputTag.value = inputTag.value.replace(/\s+/g, ' ');
  if (inputTag.value === '') {
    alert('Please enter your todo');
    return false;
  }
  return true;
}

function todoElemGen(data, queryDiv) {
  const todoElem = document.createElement('div');
  todoElem.className = `todoElem`;
  todoElem.id = data.time;
  let eslapsedTime = (new Date().getTime() - new Date(data.time)) / (1000 * 60);
  let classType = data.type.replace('tag', 'font');
  const todoTitleDiv = document.createElement('div');
  todoTitleDiv.className = `todoTitle`;
  todoTitleDiv.innerHTML = data.title;

  const todoTimeDiv = document.createElement('div');
  todoTimeDiv.className = `todoTime ${classType}`;
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

// 'todo'와 'done'을 매개변수로 받아서 각각의 리스트를 렌더링
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
        todoElem.classList.add(
          'animate__animated',
          'animate__lightSpeedOutLeft'
        );
        todoElem.addEventListener('animationend', () => {
          deleteTodoElem(todoElem);
        });
      } else {
        todoElem.classList.add(
          'animate__animated',
          'animate__lightSpeedOutLeft'
        );
        todoElem.addEventListener('animationend', () => {
          moveToTodoList(todoElem);
        });
      }
    } else {
      todoElem.classList.toggle('scrollLeft');
    }
  } else {
    if (queryDiv === todoDiv) {
      if (todoElem.classList.contains('scrollLeft')) {
        todoElem.classList.toggle('scrollLeft');
      } else if (todoElem.classList.contains('scrollRight')) {
        todoElem.classList.add(
          'animate__animated',
          'animate__lightSpeedOutRight'
        );
        todoElem.addEventListener('animationend', () => {
          moveToDoneList(todoElem);
        });
      } else {
        todoElem.classList.toggle('scrollRight');
      }
    } else {
      if (todoElem.classList.contains('scrollLeft')) {
        todoElem.classList.toggle('scrollLeft');
      } else {
        todoElem.classList.add('animate__animated', 'animate__headShake');
        todoElem.addEventListener('animationend', () => {
          todoElem.classList.remove('animate__animated', 'animate__headShake');
        });
      }
    }
  }
}

function moveToDoneList(todoElem) {
  let typeElem = todoElem.children[1].classList[1].replace('font', 'tag');
  let elemData = {
    title: todoElem.children[0].innerHTML,
    type: typeElem,
    time: todoElem.id,
  };

  let todoList = JSON.parse(localStorage.getItem('todoList'));
  let doneList = JSON.parse(localStorage.getItem('doneList')) ?? [];
  let index = todoList.findIndex((item) => item.time === elemData.time);

  if (index !== -1) {
    todoList.splice(index, 1);
    doneList.push(elemData);
    if (todoList.length === 0) {
      localStorage.removeItem('todoList');
    } else {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
    localStorage.setItem('doneList', JSON.stringify(doneList));
    location.reload();
  }
}

function moveToTodoList(todoElem) {
  let typeElem = todoElem.children[1].classList[1].replace('font', 'tag');
  let elemData = {
    title: todoElem.children[0].innerHTML,
    type: typeElem,
    time: todoElem.id,
  };

  let todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
  let doneList = JSON.parse(localStorage.getItem('doneList'));
  let index = doneList.findIndex((item) => item.time === elemData.time);

  if (index !== -1) {
    doneList.splice(index, 1);
    todoList.push(elemData);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    if (doneList.length === 0) {
      localStorage.removeItem('doneList');
    } else {
      localStorage.setItem('doneList', JSON.stringify(doneList));
    }
    location.reload();
  }
}

function deleteTodoElem(todoElem) {
  let todoList = JSON.parse(localStorage.getItem('todoList'));
  let index = todoList.findIndex((item) => item.time === todoElem.id);
  if (index !== -1) {
    todoList.splice(index, 1);
    if (todoList.length === 0) {
      localStorage.removeItem('todoList');
    } else {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }
  location.reload();
}

//처음에 함수 한번 호출
function init() {
  renderList();
  setInterval(renderList, 30000);
}

init();
