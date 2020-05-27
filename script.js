var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = JSON.parse(localStorage.getItem('todos')) || [];

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo (event) {
    // it accesses the `data-index` value
    var todoIndex = parseInt(event.target.parentElement.
        getAttribute('data-index'));
    //  and removes that todo element from the list.
    todos.splice(todoIndex, 1);
    updateLocalStorage();
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";
    // * todoCountSpan should show the total cosunt of todos on the page.
    todoCountSpan.textContent = todos.length;
    // * Inside of your render function you will also need a for loop.
    for (var i = 0; i < todos.length; i++) {
    // * create an `li` element for each index of the array.
    var li = document.createElement('li');
    // * It should set the content of the created `li` element to the value of the current array index.
    li.innerText = todos[i];
    // * When a new todo is created, add a `data-index` for each `li`.
    li.setAttribute('data-index', i);
    //   * Generate a button that says "Complete" and append it to your `li`.
    var button = document.createElement('button');
    button.innerText = "Complete";
    li.appendChild(button);
    // * Add an event listener so that when a user clicks the Complete button,
    button.addEventListener("click", removeTodo);
    // * Finally the new `li` should be appended to the `ul` provided.'
    todoList.appendChild(li);
}
};

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var newTodoText = todoInput.value;
    // Make sure that empty values are not pushed to the array.
    if (newTodoText === "") {
        return;
    }
    todos.push(newTodoText );
    updateLocalStorage();
    // clear the input field
    todoInput.value = "";
    renderTodos();
});

renderTodos();