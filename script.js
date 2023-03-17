document.getElementById('btnAdd').addEventListener('click', receiveText);
document.getElementById('todoText').addEventListener('keydown',function(e){
    if(e.key === 'Enter'){
        receiveText();
    }
})
document.getElementById('reloadAll_td').addEventListener('click', reloadTodo);
document.getElementById('reloadAll_dn').addEventListener('click', reloadDone);

reloadSum();

function addList(todoStr){
    var tr=document.createElement('tr');
    var td_txt=document.createElement('td');
    td_txt.setAttribute('class', 'td_txt');
    td_txt.innerHTML = todoStr;
    tr.appendChild(td_txt);

    var td_dlt=document.createElement('td');
    td_dlt.setAttribute('class', 'td_dlt');
    var input_dlt=document.createElement('input');
    input_dlt.setAttribute('type', 'button');
    input_dlt.setAttribute('value', "X");
    input_dlt.setAttribute('class', 'btn_dlt');
    input_dlt.onclick=dltList;
    td_dlt.appendChild(input_dlt);
    tr.appendChild(td_dlt);
    return tr;
}

function receiveText(){
    var todoText = document.querySelector("#todoText");
    if(!todoText.value){
        alert('입력된 내용이 없습니다.');
        todoText.focus();
        return false;
    }
    var todoStr= todoText.value;
    todoList(todoStr);
}

function todoList(todoStr){
    var tr = addList(todoStr);

    var td_chk=document.createElement('td');
    td_chk.setAttribute('class', 'td_chk');
    var input_chk=document.createElement('input');
    input_chk.setAttribute('type', 'button');
    input_chk.setAttribute('value', "완료");
    input_chk.setAttribute('class', 'btn_chk');
    input_chk.onclick=doneList;
    td_chk.appendChild(input_chk);
    tr.appendChild(td_chk);

    document.getElementById("todoTableBody").appendChild(tr);
    todoText.value='';
    todoText.focus();

    reloadSum();
}

function dltList(){
    this.parentElement.parentElement.remove();
    reloadSum();
}

function doneList(){
    this.parentElement.parentElement.remove();
    var tdText=this.parentElement.parentElement.innerText;
    var tr = addList(tdText);

    var td_rtn=document.createElement('td');
    td_rtn.setAttribute('class', 'td_chk');
    var input_rtn=document.createElement('input');
    input_rtn.setAttribute('type', 'button');
    input_rtn.setAttribute('value', "복귀");
    input_rtn.setAttribute('class', 'btn_rtn');
    input_rtn.onclick=rtrnTodo;
    td_rtn.appendChild(input_rtn);
    tr.appendChild(td_rtn);

    document.getElementById("doneTableBody").appendChild(tr);
    reloadSum();
}

function rtrnTodo(){
    this.parentElement.parentElement.remove();
    todoList(this.parentElement.parentElement.innerText);
    reloadSum();
}

function reloadSum(){
    var todoTable=document.getElementById("todoTableBody");
    var todo_sum = todoTable.childElementCount;
    var todo_div = document.createElement("div");
    todo_div.innerHTML = "&ensp;To-Do (" + todo_sum + ")";
    var tdSumBox = document.getElementById("todoTitleBox");
    tdSumBox.replaceChild(todo_div, tdSumBox.lastChild);
 
    var doneTable=document.getElementById("doneTableBody");
    var done_sum = doneTable.childElementCount;
    var done_div = document.createElement("div");
    done_div.innerHTML = "&ensp;Done&ensp;(" + done_sum + ")";
    var dnSumBox = document.getElementById("doneTitleBox");
    dnSumBox.replaceChild(done_div, dnSumBox.lastChild);

}

function reloadTodo(){
    var list = document.getElementById("todoTableBody");
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    reloadSum();
}

function reloadDone(){
    var list = document.getElementById("doneTableBody");
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    reloadSum();  
}
