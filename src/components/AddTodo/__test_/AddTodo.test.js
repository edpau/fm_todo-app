import { render, screen } from "@testing-library/react";
import AddTodo from "../AddTodo";
import userEvent from "@testing-library/user-event";

describe("AddTodo", () => {
  it("should render", () => {
    render(<AddTodo />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    expect(inputElement).toBeInTheDocument();
  });

  it("should let user type in todo task and show", () => {
    render(<AddTodo />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    userEvent.type(inputElement, "New Todo Task");
    expect(inputElement).toHaveDisplayValue("New Todo Task");
  });

  it("should call onTodoSubmit when Enter key is pressed", () => {
    const mockedOnKeyDown = jest.fn();
    render(<AddTodo onTodoSubmit={mockedOnKeyDown} />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    userEvent.type(inputElement, "{enter}");
    expect(mockedOnKeyDown).toHaveBeenCalledTimes(1);
  });

  it("should have correct placeholder text", () => {
    render(<AddTodo />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    expect(inputElement).toHaveAttribute("placeholder", "Create a new todo...");
  });

  it("should be initially empty", () => {
    render(<AddTodo />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    expect(inputElement.value).toBe("");
  });

  //other testing idea
  // it("should have appropriate ARIA roles and attributes")
  // it("should handle null or undefined filteredTodos gracefully"), but I want to handle this in parent component, i added default value for function filteredTodos in TodoList, TodoList({ filteredTodos =[], onToggleTodoCompletion })
});
