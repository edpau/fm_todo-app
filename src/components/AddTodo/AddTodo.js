function AddTodo({ onTodoSubmit }) {
  return (
    <section className="relative">
      <label className="sr-only" htmlFor="addTodo">
        Add Todo
      </label>
      <span className="md:translate-y-[45%] absolute left-4 top-1/2 h-5 w-5 translate-y-[35%] rounded-full border border-check-border md:left-5 md:h-6 md:w-6"></span>
      <input
        className="mt-[34px] w-full rounded-md bg-input-bg py-4 pl-12 text-xs leading-none text-input-text md:mt-[49px] md:py-[1.15rem] md:pl-[4.2rem] md:text-lg"
        id="addTodo"
        placeholder="Create a new todo..."
        onKeyDown={onTodoSubmit}
      />
    </section>
  );
}

export default AddTodo;
