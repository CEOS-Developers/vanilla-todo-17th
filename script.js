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
  let eslapsedMin = (new Date().getTime() - new Date(data.time)) / (1000 * 60);
  todoElem.innerHTML = `
        <div class='todoTitle'>${data.title}</div>
        <div class='todoTime'>${eslapsedMin.toFixed()}min...</div>    
        `;
  todoDiv.appendChild(todoElem);
}

// when plus btn not clicked
function renderList() {
  // 현재는 todoDiv의 child를 다 밀어버리고 새로 추가하는 방식으로 구현
  if (localStorage.getItem('todoList') !== null) {
    while (todoDiv.firstChild) {
      todoDiv.removeChild(todoDiv.firstChild);
    }
  }
  if (mainDiv.className === 'mainDiv') {
    let Items = JSON.parse(localStorage.getItem('todoList'));
    Items.map((item) => todoElemGen(item));
  }
}

//처음에 함수 한번 호출
renderList();
// 너무 많은 rendering을 막기 위해 10초에 한번만 자동으로 reload
setInterval(renderList, 10000);
