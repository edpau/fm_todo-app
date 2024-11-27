function AddTodo({onTodoSubmit}) {
    return <section>
      <label className="sr-only" htmlFor="addTodo">
        Add Todo
      </label>
      <input id="addTodo" placeholder="Create a new todo..." onKeyDown={onTodoSubmit}></input>
    </section>;
  }
  
  export default AddTodo;
  