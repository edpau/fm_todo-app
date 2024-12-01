
# Todo

## component
0. background
1. Header
2. dark mode switch

- Todo
useState: todos pass down
function, filter the list of todo using filter, i am thinking to hold the whole list, then create a variable to hold the filter list. and pass down to todoList 


- uuid
- todo
- complete: boolean 

    - AddTodo, input, onSubmit? then update todos
    - TodoList, use map, un-order list, show filtered todos, 
    - TodoFooter, radio button for clicking all, active, complete, button for clear complete


## Todo
- install uuid


## Find out 
- how to get main 100vh for full screen? 

- good idea to separate input list and TodoFooter as three `<section>`

- is using onKeyDown a good way for handle user enter to add a new todo? 

- best way to cross out completed items

- best way to create numOfActive


## install uuid
The warnings you are seeing are related to missing source maps for the uuid package. These warnings do not affect the functionality of your code but can be annoying during development. To resolve these warnings, you can disable source map generation for the uuid package.

Add the following configuration to your webpack.config.js file to ignore source maps for the uuid package:
```json 
module.exports = {
  // other configurations...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules\/uuid/,
        use: ['source-map-loader'],
      },
    ],
  },
};
```

If you don't have a webpack.config.js file, you can create one in the root of your project and include the above configuration.

Alternatively, you can ignore these warnings by adding the following to your .env file:

```
GENERATE_SOURCEMAP=false
```

This will disable source map generation for your entire project, which may not be ideal if you rely on source maps for debugging.

If you continue to experience issues, consider checking the uuid package documentation or updating to the latest version.



## Learn

### 1. State management
In React, state management is crucial for ensuring that components re-render correctly when data changes. Directly mutating state objects can lead to unexpected behavior and bugs because React relies on detecting changes to state to trigger re-renders. Instead, you should always create new objects or arrays when updating state.

Why Avoid Direct Mutation?
Immutability: React's state should be treated as immutable. When you directly mutate state, React may not detect the change because the reference to the state object remains the same.
Predictability: Immutable updates make it easier to track changes and debug issues, as each state change results in a new state object.
Performance: React can optimize re-renders by comparing previous and next state objects. If the reference changes, React knows that the state has changed and re-renders the component.

Example of Direct Mutation (Incorrect):
```js
const [todos, setTodos] = useState([{ id: 1, todo: "eating", complete: true }]);

function handleComplete(todoId) {
  todos.forEach((todo) => {
    if (todo.id === todoId) {
      todo.complete = !todo.complete; // Direct mutation
    }
  });
  setTodos(todos); // React may not detect the change
}
```

Correct Way Using Immutability:
```js
const [todos, setTodos] = useState([{ id: 1, todo: "eating", complete: true }]);

function handleComplete(todoId) {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, complete: !todo.complete }; // Create a new object
    }
    return todo;
  });
  setTodos(updatedTodos); // React detects the change and re-renders
}
```

In this example, clicking on a todo item toggles its complete status without directly mutating the state, ensuring that React correctly detects and handles the state change.


### 2. Animatie sun and moon icon
```js
  <button onClick={handleClick} >
      <img className="transition-all duration-1000" src={isLight? moonIcon : sunIcon} alt={isLight? "Moon icon toggle to dark mode" : "Sun icon toggle to light mode"} width={"20px"}/>
    </button>
```
The issue arises because when you toggle between two different SVG images (moonIcon and sunIcon), the browser treats this as a complete replacement of the src attribute, and CSS transitions do not animate such changes. Instead, they work for animating properties like opacity, transform, or color.

```js
    <button onClick={handleClick} className="relative w-5 h-5 bottom-1">
      <img
        src={moonIcon}
        alt="Moon Icon"
        width="20px"
        className={`transition-opacity duration-500 ${isLight ? "opacity-100" : "opacity-0"} absolute`}
      />
      <img
        src={sunIcon}
        alt="Sun Icon"
        width="20px"
        className={`transition-opacity duration-500 ${isLight ? "opacity-0" : "opacity-100"} absolute`}
      />
    </button>
```

### 3.Tailwind CSS Border Gradient, used on todo check border hover
[Tailwind CSS Border Gradient Tutorial](https://www.youtube.com/watch?v=Vlyrob0uXHs)
cover the background-gradient circle with a circle, to create the gradient border 

### 4. Accessibility, when todo check/ uncheck, announce "completed" or "not completed"

```js
 <span aria-live="polite" className="sr-only">  {todo.complete ? 'completed' : 'not completed'}</span>
```







## Testing Learn

### 1. Passing unused props

Take TodoFooter as an example, we should not omit passing onFilterChange, onClearComplete, and numOfActive.
As onFilterChange, onClearComplete, and numOfActive are expected props in the TodoFooter component.

- We should only omit Unused Props if Not Required in the Component Logic. 
    - If the component is designed to handle optional props (i.e., it has default values or checks for null/undefined), then you can leave out any props you’re not using. This keeps your tests clean and focused only on what's relevant.

- Set Up Helper Functions or Default Props for Consistency:
    Setting up helper functions or default props for consistency in your tests can make your test suite more manageable, especially when you need to render the same component multiple times with similar or identical props. This approach helps reduce redundancy and keeps the focus on the test’s intent.

Here’s how you could do it for your `TodoFooter` component tests.

#### 1. **Create a Default Props Object**

You can define a default props object outside of your test cases. This can then be spread into each `render` function to provide default values, and you can override individual props when needed.
Best Practices to Avoid Test Refactoring???
It is easier to add new function to pass in later, if new function is introduced. 
But will it be simpler not pass in unused function, if they do not affect the test? GPT said yes.

```javascript
// Default props for TodoFooter
const defaultTodoFooterProps = {
  onFilterChange: jest.fn(),
  onClearComplete: jest.fn(),
  numOfActive: 5,
};
```

Then, use this `defaultTodoFooterProps` object in each test case by spreading it into the `render` function. Here’s an example:

```javascript
it("should render radio buttons for filter options", () => {
  render(<TodoFooter {...defaultTodoFooterProps} />);

  const allFilter = screen.getByRole('radio', { name: /all/i });
  const activeFilter = screen.getByRole('radio', { name: /active/i });
  const completedFilter = screen.getByRole('radio', { name: /completed/i });

  expect(allFilter).toBeInTheDocument();
  expect(activeFilter).toBeInTheDocument();
  expect(completedFilter).toBeInTheDocument();
});
```

#### 2. **Override Specific Props When Needed**

If a test case needs to modify a specific prop (for example, changing `numOfActive`), you can override that prop while still using the defaults for others:

```javascript
it("should display the correct number of active tasks left", () => {
  render(<TodoFooter {...defaultTodoFooterProps} numOfActive={1} />);
  const taskText = screen.getByText("1 task left");
  expect(taskText).toBeInTheDocument();
});
```

#### 3. **Create a Helper Function**

Alternatively, you could create a helper function to render the component with the default props. This can be useful if you have more complex setups or need to mock additional functionality.

```javascript
const renderTodoFooter = (props = {}) => {
  return render(<TodoFooter {...defaultTodoFooterProps} {...props} />);
};

// Use the helper in your tests
it("should render radio buttons for filter options", () => {
  renderTodoFooter();

  const allFilter = screen.getByRole('radio', { name: /all/i });
  const activeFilter = screen.getByRole('radio', { name: /active/i });
  const completedFilter = screen.getByRole('radio', { name: /completed/i });

  expect(allFilter).toBeInTheDocument();
  expect(activeFilter).toBeInTheDocument();
  expect(completedFilter).toBeInTheDocument();
});

it("should call onFilterChange when a filter is selected", () => {
  const onFilterChange = jest.fn();

  //By passing { onFilterChange } as an argument, we’re overriding the default onFilterChange prop in renderTodoFooter to use our mock function.
  renderTodoFooter({ onFilterChange });

  const activeFilter = screen.getByRole('radio', { name: /active/i });
  userEvent.click(activeFilter);

  expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'active' } }));
});
```


### 2. Understanding {...defaultTodoFooterProps} in JSX

When we use `{...defaultTodoFooterProps}`, we're indeed taking advantage of JavaScript's **object spread syntax** to achieve a shorthand notation. Here’s how and why it works as a shorthand:

### Understanding `{...defaultTodoFooterProps}` in JSX

When we write:

```javascript
<TodoFooter {...defaultTodoFooterProps} />
```

this line is functionally equivalent to writing each property individually, like:

```javascript
<TodoFooter
  numOfActive={defaultTodoFooterProps.numOfActive}
  onFilterChange={defaultTodoFooterProps.onFilterChange}
  onClearComplete={defaultTodoFooterProps.onClearComplete}
/>
```

### Why `{...defaultTodoFooterProps}` Works as a Shorthand

The **spread syntax** `{...defaultTodoFooterProps}` "spreads" each key-value pair in `defaultTodoFooterProps` as individual props. So each property within `defaultTodoFooterProps` (like `numOfActive`, `onFilterChange`, and `onClearComplete`) is unpacked and passed directly to `<TodoFooter />` as if you’d written them individually.

For example, if `defaultTodoFooterProps` looks like this:

```javascript
const defaultTodoFooterProps = {
  numOfActive: 5,
  onFilterChange: handleFilterChange,
  onClearComplete: handleClearComplete,
};
```

then `<TodoFooter {...defaultTodoFooterProps} />` results in:

```javascript
<TodoFooter
  numOfActive={5}
  onFilterChange={handleFilterChange}
  onClearComplete={handleClearComplete}
/>
```

### Benefits of Using `{...defaultTodoFooterProps}`

1. **Cleaner and Less Repetitive**: With `...defaultTodoFooterProps`, we avoid manually listing each property. This makes the code more concise, especially when dealing with a large set of props.
2. **Easier Updates**: If `defaultTodoFooterProps` changes (e.g., we add another property), we don’t have to update each instance where `TodoFooter` is rendered—only `defaultTodoFooterProps` needs to change.

### Overrides with Spread Syntax

If you want to override any of these props, you can add them after the spread syntax:

```javascript
<TodoFooter {...defaultTodoFooterProps} numOfActive={10} />
```

In this case, `numOfActive={10}` will override the value of `numOfActive` from `defaultTodoFooterProps` because props specified after a spread take precedence.

### Summary

Using `{...defaultTodoFooterProps}` is simply a shorthand way of passing multiple props from an object, and it's equivalent to writing out each property manually. This makes your code cleaner, reduces repetition, and simplifies maintenance.



### 3. Access Event Details from mock.calls
If you do need to validate the event’s target.value, you can access the arguments directly from mock.calls and inspect the actual event object properties. For example in TodoList.test.js:

```js
it("should call onFilterChange with the correct filter value when a filter is selected"", () => {
  const mockOnFilterChange = jest.fn();
  render(
    <TodoFooter
      {...defaultTodoFooterProps}
      onFilterChange={mockOnFilterChange}
    />
  );

  const activeFilter = screen.getByRole("radio", { name: /active/i });
  userEvent.click(activeFilter);

  // Access the event argument from the first call of the mock function
  expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  expect(mockOnFilterChange.mock.calls[0][0].target.value).toBe("active");
});
```

In this solution, mock.calls[0][0] provides access to the first argument (the event) of the first call to mockOnFilterChange. Then, you can check that target.value is "active". [mock.call[0][0] detail](https://jestjs.io/docs/mock-functions)


### 4. Parameterize Tests for Readability and Maintainability
we can test three time with three different options
```js
 it("should call onFilterChange with 'active' when the 'Active' filter is selected", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <TodoFooter
        {...defaultTodoFooterProps}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const activeFilter = screen.getByRole("radio", { name: /active/i });
    userEvent.click(activeFilter);
    
    // Access the event argument from the first call of the mock function
    expect(mockOnFilterChange.mock.calls[0][0].target.value).toBe("active");
  });

  ```

  or we can parameterize tests for Readability and Maintainability

```js
it("should call onFilterChange with the correct filter value when a filter is selected", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <TodoFooter
        {...defaultTodoFooterProps}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const filters = [
      { name: /completed/i, expectedValue: "completed" },
      { name: /active/i, expectedValue: "active" },
      { name: /all/i, expectedValue: "all" },
    ];

    filters.forEach(({ name, expectedValue }) => {
      const filterOption = screen.getByRole("radio", { name: name });
      userEvent.click(filterOption);

      // Access the event argument from the first call of the mock function
      expect(
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0].target.value,
      ).toBe(expectedValue);
    });
  });
```

### 5. Example of not a good test
```js
 it("should render active todo without line though", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements[0]).not.toHaveClass("line-through");
  });

  it("should render completed todo with line though", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements[1]).toHaveClass("line-through");
  });
```

It passes when I set up my draft todo list, but when I update the todo list to better match the design, I changed the code and the test fail. 
Should use getByText, rather than the getByRole.

```js
 it("should render active todo without line though", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const activeItem = screen.getByText(/sleep/i)
    expect(activeItem).not.toHaveClass("line-through");
  });

  it("should render completed todo with line though", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const completedItem = screen.getByText(/buy milk/i)
    expect(completedItem).toHaveClass("line-through");
  });
```
### 6. Example of not a good test 2

```js
  it("should call onToggleTodoCompletion when a todo is clicked", () => {
    const mockToggleTodoCompletion = jest.fn();
    render(
      <TodoList
        filteredTodos={mockFilteredTodos}
        onToggleTodoCompletion={mockToggleTodoCompletion}
      />);
      const listItemElements = screen.getAllByRole("listitem");
      userEvent.click(listItemElements[0]);
      expect(mockToggleTodoCompletion).toHaveBeenCalledTimes(1);
  });
```

Similar to previous test, should have use getByText, rather than the getByRole.

```js
 it("should call onToggleTodoCompletion when a todo is clicked", () => {
    const mockToggleTodoCompletion = jest.fn();
    render(
      <TodoList
        filteredTodos={mockFilteredTodos}
        onToggleTodoCompletion={mockToggleTodoCompletion}
      />);
      const activeItem = screen.getByText(/sleep/i)
      userEvent.click(activeItem);
      expect(mockToggleTodoCompletion).toHaveBeenCalledTimes(1);
  });
```

### 7. Example of not a good test 3
```js
 it("should display only completed tasks when the completed filter is selected", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    let task1 = screen.getByText(/task 1/i);
    await userEvent.click(task1);
    const completedFilter = screen.getByText("Completed");
    await userEvent.click(completedFilter);
    const divElements = screen.getAllByRole("listitem");
    const task2 = screen.queryByText(/task 2/i);
    expect(divElements).toHaveLength(1);
    expect(task2).not.toBeInTheDocument();
  })
```

After I added drag and drop function this test fail, the problem is dnd kit turn the listitem into a button, it give the list a `role = button`.
It makes me think getByRole, is not as good as getByText, getByText is more behavior.

update with `const divElements = screen.getAllByRole("button", {name: /task/i});` to 
```js
  it("should display only completed tasks when the completed filter is selected", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    let task1 = screen.getByText(/task 1/i);
    await userEvent.click(task1);
    const completedFilter = screen.getByText("Completed");
    await userEvent.click(completedFilter);
    const divElements = screen.getAllByRole("button", {name: /task/i});
    const task2 = screen.queryByText(/task 2/i);
    expect(divElements).toHaveLength(1);
    expect(task2).not.toBeInTheDocument();
  })
```

## further test if I use API to fetch todo, (but it should best handle in parent component, read below continue)
Testing for `null` or `undefined` values in `filteredTodos` can be useful if you expect those cases to occur in your app, particularly when you’re handling dynamic data (e.g., from an API). It’s a way to ensure that your component behaves gracefully when the data is not available or is undefined.

However, whether you should add this test depends on the intended behavior of your component and the data flow in your app. Here are a few points to consider:

### 1. **Handling Default or Edge Case Data**:
   - If `filteredTodos` is **expected** to sometimes be `null` or `undefined`, then this test makes sense, as it ensures the component can handle such scenarios without errors.
   - If `filteredTodos` should **never** be `null` or `undefined`, it might be better to handle those cases earlier in the component logic (e.g., with a fallback default value or validation) and avoid explicitly testing for them.

### 2. **Graceful Rendering**:
   - Your test seems to expect that when `filteredTodos` is `null` or `undefined`, the list should simply be empty. If that's the desired behavior, this test is valid. However, it's a good idea to ensure that the component can still render a fallback UI (like a message saying "No todos available") when no data is provided.

### 3. **Improving Test Coverage**:
   If you decide this behavior is important, you can make your tests more explicit. For example, in the case of `null` or `undefined`, you could display a message to the user like "No todos found," so that the user knows why the list is empty:

   ```javascript
   function TodoList({ filteredTodos, onToggleTodoCompletion }) {
     if (!filteredTodos || filteredTodos.length === 0) {
       return <div>No todos available</div>;
     }

     return (
       <section>
         <ul>
           {filteredTodos.map((todo) => (
             <li
               key={todo.id}
               onClick={() => onToggleTodoCompletion(todo.id)}
               className={`${todo.complete && "line-through"}`}
             >
               {todo.todo}
             </li>
           ))}
         </ul>
       </section>
     );
   }
   ```

   Then, your test could look like this:

   ```javascript
   it("should render 'No todos available' when filteredTodos is null or undefined", () => {
     render(<TodoList filteredTodos={null} />);
     expect(screen.getByText(/no todos available/i)).toBeInTheDocument();

     render(<TodoList filteredTodos={undefined} />);
     expect(screen.getByText(/no todos available/i)).toBeInTheDocument();
   });
   ```

### 4. **Test Readability**:
   Your current test uses `getByRole("list")` and expects the list to be empty. While this is valid, it may be clearer to test the presence of a more specific message or an empty state indicator, as shown above.

### Conclusion:
If `filteredTodos` can indeed be `null` or `undefined` and you want your app to handle those cases gracefully, then the test is worthwhile. Just ensure that the component’s behavior in those cases is clear, either by rendering an empty state or fallback UI (like a message), and your test will align with that behavior.

## continue above, handling the filteredTodos being null or undefined in the parent component 
Yes, handling the `filteredTodos` being `null` or `undefined` in the parent component is generally a good idea for the following reasons:

### 1. **Simpler Child Component**:
   - If the child component (`TodoList`) doesn’t need to worry about whether `filteredTodos` is `null` or `undefined`, it will stay cleaner and more focused on its core responsibility (rendering the list of todos). This follows the principle of **separation of concerns**, where the parent component handles the data logic and the child component handles presentation.

### 2. **Easier Maintenance**:
   - If `filteredTodos` is always an array (either an empty array or one populated with todos), the child component will have fewer edge cases to handle. This makes the child component more predictable and easier to test.

### 3. **Consistent Data Handling**:
   - By handling the default value or error cases in the parent component, you ensure that the data passed down to the child component is always in a consistent format. This reduces the need for defensive programming in the child component.

### 4. **Improved Flexibility**:
   - If the parent component decides to pass additional logic or alternative data (e.g., setting `filteredTodos` to `[]` or `null` depending on the state of the app), the child doesn’t need to worry about it and can focus on rendering.

### How to Handle in the Parent:

You can handle `filteredTodos` in the parent like this:

```javascript
function ParentComponent() {
  const filteredTodos = todos.filter(todo => todo.complete === false); // or any other logic

  // Ensure filteredTodos is an array, default to an empty array if null or undefined
  const safeFilteredTodos = filteredTodos || [];

  return <TodoList filteredTodos={safeFilteredTodos} onToggleTodoCompletion={handleToggleTodoCompletion} />;
}
```

### Advantages:
- **Parent manages data logic**: The parent ensures that `filteredTodos` is always in a valid state, so the child (`TodoList`) can simply focus on rendering the todos.
- **Child component cleanliness**: The `TodoList` component only needs to render the list and doesn’t need to worry about `null`, `undefined`, or empty data.
- **Reduced complexity in child**: The child component doesn't need extra conditional rendering or validation logic, keeping it simple.

### Alternative (if you still want to handle it in the child):
If you prefer to keep the `TodoList` flexible in handling various edge cases (like `null`, `undefined`, or empty lists), the current approach is fine. But with a clean default or early check in the parent, the child component would focus solely on rendering, keeping it cleaner and easier to maintain.

In conclusion, handling the edge cases like `null` or `undefined` in the parent is a good strategy for maintaining separation of concerns, making both components more maintainable and focused on their responsibilities.


## Setting a default value for filteredTodos in TodoList Component
`function TodoList({ filteredTodos =[], onToggleTodoCompletion }) {}`
Setting a default value for `filteredTodos` is a great approach because it ensures that your component behaves correctly even when `filteredTodos` is not passed or is `undefined`. By defaulting it to an empty array (`filteredTodos = []`), you avoid the need for additional checks in the component or explicit handling for `null` or `undefined`.

### Benefits of Using a Default Value:

1. **Cleaner Code**:  
   By setting the default value of `filteredTodos` in the function parameter, you don't need to handle `null` or `undefined` explicitly within the body of the component. This makes the component simpler and easier to maintain.

2. **Prevents Errors**:  
   If `filteredTodos` is `undefined`, the component will gracefully handle it as an empty array and avoid any runtime errors (e.g., trying to call `.map()` on `undefined`).

3. **Improved Flexibility**:  
   Your component can now be used with or without the `filteredTodos` prop, and it will behave correctly in both cases.

### Test Update:

With the default value in place, you can simplify your tests. There's no need to check for `null` or `undefined` anymore, since the default value will always ensure that `filteredTodos` is an array. 

Here’s how your test could look:

```javascript
it("should render an empty list when filteredTodos is an empty array", () => {
  render(<TodoList filteredTodos={[]} onToggleTodoCompletion={mockToggleTodoCompletion} />);
  const listElement = screen.getByRole("list");
  expect(listElement).toBeEmptyDOMElement();
});

it("should render nothing if filteredTodos is not provided", () => {
  render(<TodoList onToggleTodoCompletion={mockToggleTodoCompletion} />);
  const listElement = screen.getByRole("list");
  expect(listElement).toBeEmptyDOMElement();
});
```

### Why This is Good for Maintenance:
- **Less Fragility**: Since you no longer have to check for `null` or `undefined` explicitly, the component is simpler and more predictable.
- **Future-Proofing**: If the way `filteredTodos` is passed to `TodoList` changes in the future, the default value will ensure that you don't have to refactor the logic around handling `null` or `undefined`.

In summary, adding a default value to `filteredTodos` is a great approach for ensuring that your component is robust, simple, and easier to maintain. It also makes your tests simpler, focusing on the actual behavior rather than handling edge cases for missing props.





