// Tumm Elementleri secme
const  form=document.querySelector("#todo-form");
const todoInput =document.querySelector("#todo");
const todoList= document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];

const filter =document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");
const alertInfo=document.querySelector("#alertInfo");
eventListeners();
function eventListeners(){ // Tum event listenerler burdan atancak

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosTOUI);
    
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(a){
    //Arayuzden Todolari temizleme
    if(confirm("Are you sure you want to delete all of them?")){
      // yavas yontem  todoList.innerHTML=" ";
    //  todoList.removeChild(todoList.firstElementChild);
        while(todoList.firstElementChild!= null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
}
};
function filterTodos(e){
  //  console.log(e.target.value);
  const filterValue= e.target.value.toLowerCase();
  const listItems=document.querySelectorAll(".list-group-item");

  listItems.forEach(function(listItem){
      const text = listItem.textContent.toLowerCase();
      if(text.indexOf(filterValue) === -1){
          // Bulamadi
          listItem.setAttribute("style","display: none !important");
      }
      else{
          listItem.setAttribute("style","display: block");
      }
  });

}
function deleteTodo(e){
    if( e.target.className=== "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFrontStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo successfully deleted...");
       // console.log("Silme islemi");
    }

}
function deleteTodoFrontStorage(deletetodo){
    let todos= getTodosFrontStorage();

    todos.forEach(function(todo,index){
        if(todo===deletetodo){
      todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosTOUI(){
    
   let todos= getTodosFrontStorage();
   todos.forEach(function(todo){
       addTodoToUI(todo);
   })

}  
function addTodo(e){
    let todos= getTodosFrontStorage();
    const newTodo=todoInput.value.trim();
    let isThere= false;/*
    todos.forEach(function(item){
       if(   item.indexOf(newTodo) !=-1){
           isThere=true;
       }
    });
    */
   for(let i =0;i<10;i++){
       if(newTodo=== todos[i]){
           isThere=true;
       }
   };
    if(newTodo=== ""){
        showAlert("danger","Please enter a todo...");
        
    }
    else if(isThere){
        
        showAlert("warning","You have added this todo before");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToUIStorage(newTodo);
        showAlert("success","Todo successfully added...");

        
    }

   // console.log(newTodo);

    


    e.preventDefault();
}
function getTodosFrontStorage(){ // Storagelardan Todolari almak
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
      todos= JSON.parse( localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToUIStorage(newTodo){
    let todos=getTodosFrontStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
  /*  let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
      todos= JSON.parse( localStorage.getItem("todos"));
    }
    */
}

function showAlert(type,message){
    const alert= document.createElement("div");
    alert.className= `alert alert-${type}`;
    alert.textContent=message;
    console.log(alert);

    firstCardBody.appendChild(alert);
    //setTimeout
    window.setTimeout(  function(){
        alert.remove();
    },1000 );

};








function addTodoToUI(newTodo){ // String degeri List item olarak ekliycek
   //List Item Olusturma
    const listItem=document.createElement("li");
    //Link olusturma
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>"


    // li olusturma
    listItem.className="list-group-item d-flex justify-content-between";
    
    //Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    //Todo Liste , List Item ekleme
    todoList.appendChild(listItem);
    todoInput.value= "";
    console.log(link);

}
console.log(localStorage.getItem("todos"));




