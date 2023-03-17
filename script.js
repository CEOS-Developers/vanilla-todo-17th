// elements
const plusIcon = document.querySelector('.plusBtn');
const submitBtn = document.querySelector('.submitBtn');
const hoverDiv = document.querySelector('.hoverDiv');
const mainDiv = document.querySelector('.mainDiv');
const todoDiv = document.querySelector('#todoDiv');
const doneDiv = document.querySelector('#doneDiv');
const inputTag = document.querySelector('.customInput');
const tagList = document.querySelectorAll('.tagDiv > div > span');
const staticHolder = document.querySelectorAll('.staticHolder');
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
plusIcon.addEventListener('click', handlePlusIconClick);
tagList.forEach((tag) => tag.addEventListener('click', handleTagClick));
submitBtn.addEventListener('click', handleSubmitClick);
staticHolder.forEach((holder) =>
  holder.addEventListener('click', handleStaticClick)
);
// Event Handlers
function handlePlusIconClick() {
  mainDiv.classList.toggle('covered');
  hoverDiv.classList.toggle('covered');
  todoDiv.classList.toggle('covered');
  if (mainDiv.className !== 'mainDiv covered') {
    inputTag.value = '';
  }
}

function handleTagClick() {
  tagList.forEach((whiteTag) => whiteTag.classList.remove('whiteRing'));
  tagNames.forEach((tagName) => {
    if (this.classList.contains(tagName)) {
      this.classList.toggle('whiteRing');
    }
  });
}

function handleSubmitClick() {
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
}

function handleStaticClick() {
  this.classList.add('animate__animated', 'animate__headShake');
  this.addEventListener('animationend', () => {
    this.classList.remove('animate__animated', 'animate__headShake');
  });
}

//  functions
function inputValidation() {
  inputTag.value = inputTag.value.trim();
  inputTag.value = inputTag.value.replace(/\s+/g, ' ');
  if (inputTag.value === '') {
    alert('Invalid TODO Input!');
    return false;
  }
  return true;
}

function createTodoElement(data, queryDiv) {
  const todoElem = document.createElement('div');
  todoElem.className = 'todoElem';
  todoElem.id = data.time;

  const elapsedTime = getElapsedTime(data.time);
  const timeClass = data.type.replace('tag', 'font');

  const titleDiv = document.createElement('div');
  titleDiv.className = `todoTitle`;
  titleDiv.textContent = data.title;

  const timeDiv = document.createElement('div');
  timeDiv.className = `todoTime ${timeClass}`;
  timeDiv.textContent = elapsedTime;

  todoElem.append(titleDiv, timeDiv);
  queryDiv.appendChild(todoElem);

  todoElem.addEventListener('click', (e) => {
    handleTodoClick(e, todoElem, queryDiv);
  });
}

function getElapsedTime(time_num) {
  const timeNum = (Date.now() - new Date(time_num)) / (1000 * 60);
  const days = Math.floor(timeNum / 1440);
  const hours = Math.floor((timeNum % 1440) / 60);
  const minutes = Math.floor(timeNum % 60);

  let parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours % 24 > 0) parts.push(`${hours % 24}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.length > 0 ? parts.join(' ') : 'just now';
}

// 'todo'와 'done'을 매개변수로 받아서 각각의 리스트를 렌더링
function renderList(container, listName) {
  if (localStorage.getItem(listName) !== null) {
    container.innerHTML = '';

    const items = JSON.parse(localStorage.getItem(listName)) || [];
    items.sort((a, b) => new Date(a.time) - new Date(b.time));
    items.forEach((item) => createTodoElement(item, container));
  }
}

// when plus btn not clicked
function render() {
  renderList(todoDiv, 'todoList');
  renderList(doneDiv, 'doneList');

  setInterval(() => {
    renderList(todoDiv, 'todoList');
    renderList(doneDiv, 'doneList');
  }, 30000);
}

// div가 클릭되었을 때 그 div의 어느 부분을 클릭했는지 계산
function getClickRatio(div, e) {
  const rect = div.getBoundingClientRect();
  const width = rect.width;
  const x = e.clientX - rect.left;
  return x / width;
}

function handleTodoClick(e, todoElem, queryDiv) {
  let clickratio = getClickRatio(todoElem, e);

  if (todoElem.classList.contains('scrollLeft')) {
    clickratio -= 0.3;
  } else if (todoElem.classList.contains('scrollRight')) {
    clickratio += 0.3;
  }

  if (clickratio < 0.5) {
    if (todoElem.classList.contains('scrollRight')) {
      toggleScrollClass(todoElem, 'scrollRight');
    } else if (todoElem.classList.contains('scrollLeft')) {
      handleLeftScrollClick(todoElem, queryDiv);
    } else {
      toggleScrollClass(todoElem, 'scrollLeft');
    }
  } else {
    if (queryDiv === todoDiv) {
      if (todoElem.classList.contains('scrollLeft')) {
        toggleScrollClass(todoElem, 'scrollLeft');
      } else if (todoElem.classList.contains('scrollRight')) {
        handleRightScrollClick(todoElem);
      } else {
        toggleScrollClass(todoElem, 'scrollRight');
      }
    } else {
      handleDoneItemClick(todoElem);
    }
  }
}

function toggleScrollClass(todoElem, className) {
  todoElem.classList.toggle(className);
}

function handleLeftScrollClick(todoElem, queryDiv) {
  if (queryDiv === todoDiv) {
    todoElem.classList.add('animate__animated', 'animate__lightSpeedOutLeft');
    todoElem.addEventListener('animationend', () => {
      deleteTodoElem(todoElem);
    });
  } else {
    todoElem.classList.add('animate__animated', 'animate__lightSpeedOutLeft');
    todoElem.addEventListener('animationend', () => {
      moveToTodoList(todoElem);
    });
  }
}

function handleRightScrollClick(todoElem) {
  todoElem.classList.add('animate__animated', 'animate__lightSpeedOutRight');
  todoElem.addEventListener('animationend', () => {
    moveToDoneList(todoElem);
  });
}

function handleDoneItemClick(todoElem) {
  if (todoElem.classList.contains('scrollLeft')) {
    toggleScrollClass(todoElem, 'scrollLeft');
  } else {
    todoElem.classList.add('animate__animated', 'animate__headShake');
    todoElem.addEventListener('animationend', () => {
      todoElem.classList.remove('animate__animated', 'animate__headShake');
    });
  }
}

function getElemData(todoElem) {
  const title = todoElem.children[0].innerHTML;
  const type = todoElem.children[1].classList[1].replace('font', 'tag');
  const time = todoElem.id;
  return { title, type, time };
}

function moveItem(sourceListKey, destListKey, itemData) {
  const sourceList = JSON.parse(localStorage.getItem(sourceListKey)) ?? [];
  const destList = JSON.parse(localStorage.getItem(destListKey)) ?? [];
  const index = sourceList.findIndex((item) => item.time === itemData.time);
  if (index !== -1) {
    sourceList.splice(index, 1);
    destList.push(itemData);
    if (sourceList.length === 0) {
      localStorage.removeItem(sourceListKey);
    } else {
      localStorage.setItem(sourceListKey, JSON.stringify(sourceList));
    }
    if (destList.length === 0) {
      localStorage.removeItem(destListKey);
    } else {
      localStorage.setItem(destListKey, JSON.stringify(destList));
    }
    location.reload();
  }
}

function moveToDoneList(todoElem) {
  const elemData = getElemData(todoElem);
  moveItem('todoList', 'doneList', elemData);
}

function moveToTodoList(todoElem) {
  const elemData = getElemData(todoElem);
  moveItem('doneList', 'todoList', elemData);
}

function deleteTodoElem(todoElem) {
  const todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
  const index = todoList.findIndex((item) => item.time === todoElem.id);
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
  render();
}

window.addEventListener('load', init);
