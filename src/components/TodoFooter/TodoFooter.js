function TodoFooter({ onFilterChange, onClearComplete, numOfActive }) {
  return (
    <>
      <section className="text-footer-text grid grid-cols-2 gap-y-4 md:grid-cols-4">
        <p
          className="order-1 rounded-bl-[0.3125rem] bg-todo-bg pb-[1.375rem] pl-5 pt-4 text-xs md:text-sm md:pb-0"
          aria-live="polite"
        >
          {numOfActive < 2
            ? `${numOfActive} item left`
            : `${numOfActive} items left`}
        </p>
        <fieldset className="order-2 col-span-2 flex justify-center gap-3 rounded-[0.3125rem] bg-todo-bg py-[0.9375rem] text-sm md:order-1 md:rounded-none">
          <legend className="sr-only">filter todo list</legend>
          <div>
            <input
              className="peer sr-only"
              type="radio"
              name="filter"
              value="all"
              id="all"
              defaultChecked={true}
              onChange={onFilterChange}
            />
            <label
              className="peer-checked:text-footer-text-active cursor-pointer peer-hover:text-footer-text-hover"
              htmlFor="all"
            >
              {" "}
              All
            </label>
          </div>
          <div>
            <input
              className="peer sr-only"
              type="radio"
              name="filter"
              value="active"
              id="active"
              onChange={onFilterChange}
            />
            <label
              className="peer-checked:text-footer-text-active cursor-pointer peer-hover:text-footer-text-hover"
              htmlFor="active"
            >
              {" "}
              Active
            </label>
          </div>
          <div>
            <input
              className="peer sr-only"
              type="radio"
              name="filter"
              id="filter"
              value="completed"
              onChange={onFilterChange}
            />
            <label
              className="peer-checked:text-footer-text-active cursor-pointer peer-hover:text-footer-text-hover"
              htmlFor="filter"
            >
              Completed
            </label>
          </div>
        </fieldset>
        <button
          className="order-1 rounded-br-[0.3125rem] bg-todo-bg pr-5 text-right text-xs md:text-sm flex items-start justify-end pt-4 hover:text-footer-text-hover"
          onClick={onClearComplete}
        >
          Clear Completed
        </button>
      </section>
      <p className="text-footer-text w-full pt-10 text-center text-[0.875rem]">
        Drag and drop to reorder list
      </p>
    </>
  );
}

export default TodoFooter;
