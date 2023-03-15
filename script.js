const plusIcon = document.querySelector('.plusBtn');
const submitBtn = document.querySelector('.submitBtn');
const hoverDiv = document.querySelector('.hoverDiv');
const mainDiv = document.querySelector('.mainDiv');
const todoDiv = document.querySelector('.todoDiv');
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

function todoElemGen(data) {
  const todoElem = document.createElement('div');
  todoElem.className = `todoElem ${data.type}`;
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
  todoDiv.appendChild(todoElem);
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

// when plus btn not clicked
function renderList() {
  // 현재는 todoDiv의 child를 다 밀어버리고 새로 추가하는 방식으로 구현
  if (localStorage.getItem('todoList') !== null) {
    while (todoDiv.firstChild) {
      todoDiv.removeChild(todoDiv.firstChild).remove();
    }
  }
  if (mainDiv.className === 'mainDiv') {
    let Items = JSON.parse(localStorage.getItem('todoList'));
    if (Items) {
      Items.forEach((item) => todoElemGen(item));
    }
  }
}

function transferToDone() {}

//처음에 함수 한번 호출
function init() {
  renderList();
}

init();
// 너무 많은 rendering을 막기 위해 10초에 한번만 자동으로 reload
setInterval(renderList, 10000);
