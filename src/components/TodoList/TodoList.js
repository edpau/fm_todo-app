import checkIcon from "../../assets/images/icon-check.svg";
import crossIcon from "../../assets/images/icon-cross.svg"

function TodoList({ filteredTodos = [], onToggleTodoCompletion, onClickDeleteTodo }) {
  return (
    <section>
      <ul className="bg-todo-bg mt-4 w-full rounded-t-[5px]">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`border-todo-border flex justify-between border-b px-5 py-4`}
            aria-label={todo.complete ? `${todo.task}, completed` : todo.task}
          >
            <button
              className="relative flex group"
              onClick={() => {
                onToggleTodoCompletion(todo.id);
              }}
              aria-label="toggle todo completion"
            >
              <span className=" h-5 w-5 rounded-full bg-check-border group-hover:bg-check-gradient"></span>
              <span className={`absolute top-[0.04rem] left-[0.05rem] h-[1.15rem] w-[1.15rem] rounded-full  ${todo.complete ? "bg-check-gradient" : "bg-todo-bg"}`}></span>
              <span className="absolute top-[0.3rem] left-1">{todo.complete && <img src={checkIcon} alt="check" />}</span>
              <span
                className={`${todo.complete === true && "line-through text-todo-text-complete"} ml-3 text-xs text-todo-text`}
              >
                {todo.task}
              </span>
              <span aria-live="polite" className="sr-only">  {todo.complete ? 'completed' : 'not completed'}</span>
            </button>

            <button
              onClick={() => {
                onClickDeleteTodo(todo.id)
              }}
              aria-label="delete todo"
            >
              <img src={crossIcon} alt="cross" className="w-3"/>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
