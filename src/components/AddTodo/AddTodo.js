function AddTodo({onTodoSubmit}) {
    return <section className="relative">
      <label className="sr-only" htmlFor="addTodo">
        Add Todo
      </label>
      <span className="w-5 h-5 left-4 rounded-full absolute top-1/2 translate-y-[35%] border border-check-border"></span>
      <input className="w-full rounded-md pl-12 py-4 mt-9 text-xs text-input-text bg-input-bg" id="addTodo" placeholder="Create a new todo..." onKeyDown={onTodoSubmit}/>
      
    </section>;
  }
  
  export default AddTodo;
  