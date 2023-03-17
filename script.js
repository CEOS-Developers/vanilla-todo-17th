class Todo {
  constructor(name) {
    this.name = name;
    this.list = [];
  }
  getNewId() {
    return this.list.length + 1;
  }
  getListItem(id) {
    return this.list.filter((item) => item.id === id)[0];
  }
  addListItem(item) {
    this.list.push(item);
  }
  toggleStatus(id) {
    // status 토글 (todo <-> done)
    const updateArray = this.list.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    this.list = updateArray;
  }
  removeItem(id) {
    this.list.filter((item) => item.id !== id);
  }
}

function handleInput(e) {
  if (e.key === ENTER || e.target.id === ADD_BUTTON) {
    let id = myTodoList.getNewId();
    if (inputValue.value === '') return;
    let newItem = {
      id: id,
      value: inputValue.value,
      status: TODO,
    };
    myTodoList.addListItem(newItem);

    inputValue.value = '';
  }
}
