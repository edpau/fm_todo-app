function TodoFooter({onFilterChange, onClearComplete, numOfActive}) {

    return (
      <section>
        <fieldset>
          <legend>filter todo list</legend>
          <label>
            <input type="radio" name="filter" value="all" defaultChecked={true}  onChange={onFilterChange}/>
            All
          </label>
          <label>
            <input type="radio" name="filter" value="active" onChange={onFilterChange}/>
            Active
          </label>
          <label>
            <input type="radio" name="filter" value="completed" onChange={onFilterChange}/>
            Completed
          </label>
        </fieldset>
        <p>{(numOfActive<2) ? `${numOfActive} item left` : `${numOfActive} items left`}</p>
        <button onClick={onClearComplete}>Clear Completed</button>
      </section>
    );
  }
  
  export default TodoFooter;
  