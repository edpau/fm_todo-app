import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Task from "../Task/Task";

function TodoList({ filteredTodos = [], onToggleTodoCompletion, onClickDeleteTodo }) {
  return (
    <section>
      <ul className="bg-todo-bg mt-4 w-full rounded-t-[5px]">
        <SortableContext items={filteredTodos} strategy={verticalListSortingStrategy}>
        {filteredTodos.map((todo) => (
          <Task key={todo.id} id={todo.id} task={todo.task} complete={todo.complete} onToggleTodoCompletion={onToggleTodoCompletion} onClickDeleteTodo={onClickDeleteTodo}/>
        ))}
      </SortableContext>
      </ul>
    </section>
  );
}

export default TodoList;
