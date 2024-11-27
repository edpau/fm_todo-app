import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  const mockFilteredTodos = [
    { id: 1, task: "Sleep", complete: false },
    { id: 2, task: "Buy milk", complete: true },
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
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements.length).toBe(2);
  });

  it("should render todos with correct content", () => {
    render(<TodoList filteredTodos={mockFilteredTodos} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements[0]).toHaveTextContent("Sleep");
    expect(listItemElements[1]).toHaveTextContent("Buy milk");
  });

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
});
