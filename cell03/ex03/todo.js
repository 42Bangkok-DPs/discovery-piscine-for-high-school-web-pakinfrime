const todoList = document.getElementById('ft_list');

function createTodo() {
  const newTodo = prompt('Enter a new to-do item:');
  if (newTodo) {
    const todoItem = document.createElement('div');
    todoItem.textContent = newTodo;
    todoItem.addEventListener('click', deleteTodo);
    todoList.prepend(todoItem);
    saveTodos();
  }
}
function deleteTodo(event) {
  if (confirm('delete this item?')) {
    event.target.remove();
    saveTodos();
  }
}
function saveTodos() {
  const todos = [];
  for (const todoItem of todoList.children) {
    todos.push(todoItem.textContent);
  }
  document.cookie = todos=$JSON.stringify(todos);
}

function loadTodos() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'todos') {
      const loadedTodos = JSON.parse(value);
      loadedTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.textContent = todo;
        todoItem.addEventListener('click', deleteTodo);
        todoList.appendChild(todoItem);
      });
      break;
    }
  }
}

window.onload = loadTodos;
const newButton = document.getElementById('newButton');
newButton.addEventListener('click', createTodo);