var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = JSON.parse(localStorage.getItem('todos')) || [];

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo (event) {
    var todoIndex = parseInt(event.target.parentElement.getAttribute('data-index'));
    todos.splice(todoIndex, 1);
    updateLocalStorage();
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";
    todoCountSpan.textContent = todos.length;

for (var i = 0; i < todos.length; i++) {

var li = document.createElement('li');

li.innerText = todos[i];
li.setAttribute('data-index', i);

var button = document.createElement('button');

button.innerText = "Complete";

li.appendChild(button);

button.addEventListener("click", removeTodo);
todoList.appendChild(li);
}
};



todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var newTodoText = todoInput.value
    if (newTodoText === "") {
        return;
    }
    
    todos.push(newTodoText );
    updateLocalStorage();


    todoInput.value = "";

    renderTodos();
});


renderTodos();
