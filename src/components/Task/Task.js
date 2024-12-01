import checkIcon from "../../assets/images/icon-check.svg";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({
  id,
  task,
  complete,
  onToggleTodoCompletion,
  onClickDeleteTodo,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={id}
      className={`group flex touch-none justify-between border-b border-todo-border px-5 py-4 cursor-move items-center`}
      aria-label={complete ? `${task}, completed` : task}
    >
      <button
        className="group relative flex items-center"
        onClick={() => {
          onToggleTodoCompletion(id);
        }}
        aria-label="toggle todo completion"
      >
        <span className="md:h-6 md:w-6 h-5 w-5 rounded-full bg-check-border group-hover:bg-check-gradient"></span>
        <span
          className={`md:h-[1.40rem] md:w-[1.40rem] md:top-[0.16rem] absolute left-[0.05rem] top-[0.04rem] h-[1.15rem] w-[1.15rem] rounded-full ${complete ? "bg-check-gradient" : "bg-todo-bg"}`}
        ></span>
        <span className="absolute left-1 top-[0.3rem] md:top-[0.60rem] md:left-[0.38rem]">
          {complete && <img src={checkIcon} alt="check" />}
        </span>
        <p
          className={`${complete === true && "text-todo-text-complete line-through"} ml-3 text-xs text-todo-text md:ml-6 md:text-lg`}
        >
          {task}
        </p>
        <span aria-live="polite" className="sr-only">
          {" "}
          {complete ? "completed" : "not completed"}
        </span>
      </button>

      <button
        onClick={() => {
          onClickDeleteTodo(id);
        }}
        aria-label="delete todo"
        className="opacity-0 group-hover:opacity-100 w-3 h-auto md:w-4"
      >
           <svg className="text-[#494C6B] hover:text-cross-hover transition-colors" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 18 18">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </li>
  );
}
