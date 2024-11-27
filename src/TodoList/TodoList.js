function TodoList({ filteredTodos =[], onToggleTodoCompletion }) {
  return (
    <section>
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => {
              onToggleTodoCompletion(todo.id);
            }}
            className={`${todo.complete === true && "line-through"}`}
            aria-label={todo.complete ? `${todo.task}, completed` : todo.task}
          >
            {todo.task}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
