import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo.js";
import { v4 as uuid } from "uuid";
import TodoList from "../TodoList/TodoList.js";
import TodoFooter from "../TodoFooter/TodoFooter.js";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  let filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return todo;
    } else if (filter === "active") {
      return todo.complete === false;
    } else {
      return todo.complete === true;
    }
  });

  // Ensure filteredTodos is an array, default to an empty array if null or undefined
  const safeFilteredTodos = filteredTodos || [];

  let numOfActive = (function calNumOfActive() {
    if (todos.length === 0) {
      return 0;
    }
    let numOfActive = 0;
    todos.forEach((todo) => {
      if (todo.complete === false) {
        numOfActive++;
      }
    });
    return numOfActive;
  })();

  function handleAddTodo(event) {
    if (event.key === "Enter") {
      const todo = event.target.value.trim();
      if (!todo) return;
      setTodos([
        ...todos,
        {
          id: uuid(),
          task: todo,
          complete: false,
        },
      ]);
      event.target.value = "";
    }
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleClearComplete() {
    const updatedTodos = todos.filter((todo) => todo.complete === false);
    setTodos(updatedTodos);
  }

  function toggleTodoCompletion(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  }

  function handleClickDeleteTodo(todoId) {
    const updatedTodos = todos.filter((todo) => {
      if (todo.id === todoId) {
        return false;
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  }

  return (
    <main>
      <AddTodo onTodoSubmit={handleAddTodo} />
      <TodoList
        filteredTodos={safeFilteredTodos}
        onToggleTodoCompletion={toggleTodoCompletion}
        onClickDeleteTodo = {handleClickDeleteTodo}
      />
      <TodoFooter
        numOfActive={numOfActive}
        onFilterChange={handleFilterChange}
        onClearComplete={handleClearComplete}
      />
    </main>
  );
}

export default Todo;
