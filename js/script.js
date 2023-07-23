const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const todoDiv = document.getElementById("todo-list");

// console.log(todoDiv);

const getTodos = () => {
  fetch(apiUrl + "?_limit=10")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((todo) => {
        addTodoToDOM(todo);
      });
    });
};

const addTodoToDOM = (todo) => {
  const div = document.createElement("div");
  div.classList.add("todo");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);

  if (todo.completed) {
    div.classList.add("done");
  } else {
    // div.classList.add("unmarked");
  }

  todoDiv.appendChild(div);
};

const createTodo = (e) => {
  e.preventDefault();

  // Access to the input (firstElementChild)
  // console.log(e.target.firstElementChild.value);

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => addTodoToDOM(data));
};

const toggleCompleted = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");

    updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
    // console.log(e.target.dataset.id);
  }
};

const updateTodo = (id, completed) => {
  // console.log(id, completed);
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // .then(res => res.json())
  // .then(data => console.log(data))
};

const deleteTodo = (e) => {
  if (e.target.classList.contains("todo")) {
    // console.log("Delete");
    const id = e.target.dataset.id;
    // console.log(id);
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
  document
    .querySelector("#todo-list")
    .addEventListener("click", toggleCompleted);
  document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);
};

init();
