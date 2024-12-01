import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  const mockFilteredTodos = [
    { id: 1, task: "task 1", complete: false },
    { id: 2, task: "task 2", complete: true },
  ];

  it("should render the list container", () => {
    render(<TodoList filteredTodos={[]} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  it("should render an empty list when no todos are passed", () => {
    render(<TodoList filteredTodos={[]} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeEmptyDOMElement();
  });

  it("should render all passed todos", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const listItemElements = screen.getAllByRole("button", {name: /task/i});
    expect(listItemElements.length).toBe(2);
  });

  it("should render todos with correct content", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const listItemElements = screen.getAllByRole("button", {name: /task/i});
    expect(listItemElements[0]).toHaveTextContent("task 1");
    expect(listItemElements[1]).toHaveTextContent("task 2");
  });

  it("should render active todo without line though", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const activeItem = screen.getByText(/task 1/i)
    expect(activeItem).not.toHaveClass("line-through");
  });

  it("should render completed todo with line though", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const completedItem = screen.getByText(/task 2/i)
    expect(completedItem).toHaveClass("line-through");
  });

  it("should call onToggleTodoCompletion when a todo is clicked", () => {
    const mockToggleTodoCompletion = jest.fn();
    render(
      <TodoList
        filteredTodos={mockFilteredTodos}
        onToggleTodoCompletion={mockToggleTodoCompletion}
      />);
      const activeItem = screen.getByText(/task 1/i)
      userEvent.click(activeItem);
      expect(mockToggleTodoCompletion).toHaveBeenCalledTimes(1);
  });

  it("should call onClickDeleteTodo when cross icon is clicked", ()=>{
    const mockOnClickDeleteTodo = jest.fn();
    render(<TodoList filteredTodos={mockFilteredTodos} onClickDeleteTodo={mockOnClickDeleteTodo}/>)
    const deleteButtons = screen.getAllByLabelText("delete todo");
    userEvent.click(deleteButtons[0]);
    expect(mockOnClickDeleteTodo).toHaveBeenCalledTimes(1);
  })
});
