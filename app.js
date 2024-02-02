//////////////////// Variable ////////////////////

let $=document;
let input=$.querySelector(".input");
let addBtn=$.querySelector(".add-todo");
let deleteBtn=$.querySelector(".clear-todo");
let todoLists=$.querySelector(".todo-wrapper");
let todoName=$.querySelector(".todo-name");
let todosArray=[];

//////////////////// Functions ////////////////////

function addTodo(){
    let  newTodoObj={
        id:todosArray.length+1 ,
        title:input.value,
        complete:false
    }
    
    todosArray.push(newTodoObj);
    setLocalStorage(todosArray);
    todoGeneratore(todosArray);
    input.value="";
    input.focus();
}
function todoGeneratore(todoList){
    let newTodo;
    let newTodoName;
    let newTodoBtns;
    let newCompleteBtn;
    let newDeleteBtn;
    todoLists.innerHTML = '';
    todoList.forEach(function(todo){

        newTodo=$.createElement("div");
        newTodo.className="complete todo-item";
        
        newTodoName=$.createElement("p");
        newTodoName.className="todo-name";
        newTodoName.innerHTML=todo.title;

        newTodoBtns=$.createElement("div");
        newTodoBtns.className="control-todo";

        newCompleteBtn=$.createElement("button");
        newCompleteBtn.className="complete-todo";
        newCompleteBtn.innerHTML="Complete";
        newCompleteBtn.setAttribute("onclick","completeTodoHandeler("+todo.id+")")

        newDeleteBtn=$.createElement("button");
        newDeleteBtn.className="delete-todo";
        newDeleteBtn.innerHTML="Delete";
        newDeleteBtn.setAttribute("onclick","removeTodoHandeler("+todo.id+")")

        newTodoBtns.append(newCompleteBtn);
        newTodoBtns.append(newDeleteBtn);
        newTodo.append(newTodoName);
        newTodo.append(newTodoBtns);
        todoLists.append(newTodo);
        if(todo.complete){
            newTodo.className="uncomplete todo-item";
            newCompleteBtn.innerHTML="UnComplete";
        }
    })
    
}
function enterTodoHandeler(event){
    if(event.keyCode===13){
        addTodo();
    }
}
function deleteTodoHandeler(){
    todosArray=[];
    todoGeneratore(todosArray);
    localStorage.removeItem("todo status");
}
function setLocalStorage(todosList){
    localStorage.setItem("todo status",JSON.stringify(todosList));
};
function getLocalSorage(){
    let localStorageTodos=JSON.parse(localStorage.getItem("todo status"));
    if(localStorageTodos){
        todosArray=localStorageTodos;
    }else{
        todosArray=[];
    }
    todoGeneratore(todosArray);
};
function removeTodoHandeler(todoId){
    let localStorageTodo=JSON.parse(localStorage.getItem("todo status"));
    todosArray=localStorageTodo;
    let mainTodoIndex=todosArray.findIndex(function (item){
        return item.id===todoId;
    });
    todosArray.splice(mainTodoIndex,1);
    setLocalStorage(todosArray);
    todoGeneratore(todosArray);
};
function completeTodoHandeler(todoId){
    let localStorageTodo=JSON.parse(localStorage.getItem("todo status"));
    todosArray=localStorageTodo;
    todosArray.forEach(function(item){
        if(item.id===todoId){
            item.complete=!item.complete;
        }
    });
    setLocalStorage(todosArray);
    todoGeneratore(todosArray);
};
//////////////////// Events ////////////////////

input.addEventListener("keyup",enterTodoHandeler);
addBtn.addEventListener("click",addTodo);
deleteBtn.addEventListener("click",deleteTodoHandeler);
window.addEventListener("load",getLocalSorage);