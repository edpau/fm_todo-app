import { render, screen } from "@testing-library/react";
import Todo from "../Todo";
import userEvent from "@testing-library/user-event";

async function addTasks(tasks) {
  const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
  for (let task of tasks) {
    await userEvent.type(inputElement, `${task}{enter}`);
  }
}

describe("Todo Integration Test", () => {
  it("should render a new task after input and submission", async () => {
    render(<Todo />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    await userEvent.type(inputElement, "New Todo Task{enter}");
    const divElement = screen.getByText(/New Todo Task/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render multiple tasks after multiple inputs and submissions", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    const divElements = screen.getAllByRole("listitem");
    expect(divElements).toHaveLength(3);
  });

  it("should clear the input after submission", () => {
    render(<Todo />);
    const inputElement = screen.getByRole("textbox", { name: "Add Todo" });
    userEvent.type(inputElement, "New Todo Task{enter}");
    expect(inputElement).toHaveDisplayValue("");
  });

  it("should render a new task without completed initially", () => {
    render(<Todo />);
    addTasks(["Task 1"]);
    const divElement = screen.getByText(/Task 1/i);
    expect(divElement).not.toHaveClass("line-through");
  });

  it("should add line though the task when the active task is clicked", async () => {
    render(<Todo />);
    addTasks(["Task 1"]);
    const divElement = screen.getByText(/Task 1/i);
    await userEvent.click(divElement);
    expect(divElement).toHaveClass("line-through");
  });

  it("should clear completed task when 'Clear Completed' button is clicked", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    let divElements = screen.getAllByRole("listitem");
    expect(divElements).toHaveLength(3);
    const task1 = screen.getByText(/task 1/i);
    const task2 = screen.getByText(/task 2/i);
    await userEvent.click(task1);
    await userEvent.click(task2);
    const clearCompletedButton = screen.getByRole("button", {
      name: "Clear Completed",
    });
    await userEvent.click(clearCompletedButton);
    divElements = screen.getAllByRole("listitem");
    expect(divElements).toHaveLength(1);
  });

  it("should display the correct number of active tasks", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    const activeTasksText = screen.getByText(/3 items left/i);
    expect(activeTasksText).toBeInTheDocument();
  });

  it("should update the number of active tasks when task is marked as completed", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    let activeTasksText = screen.getByText(/3 items left/i);
    expect(activeTasksText).toBeInTheDocument();
    const task1 = screen.getByText(/task 1/i);
    await userEvent.click(task1);
    activeTasksText = screen.getByText(/2 items left/i);
    expect(activeTasksText).toBeInTheDocument();
  });

  it("should display only active tasks when the active filter is selected", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    let task1 = screen.getByText(/task 1/i);
    await userEvent.click(task1);
    const activeFilter = screen.getByText(/active/i);
    await userEvent.click(activeFilter);
    const divElements = screen.getAllByRole("listitem");
    task1 = screen.queryByText(/task 1/i);
    expect(divElements).toHaveLength(2);
    expect(task1).not.toBeInTheDocument();
  });

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

  it("should display all tasks when the all filter is selected", async () => {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    let task1 = screen.getByText(/task 1/i);
    await userEvent.click(task1);
    const completedFilter = screen.getByText("Completed");
    await userEvent.click(completedFilter);
    let divElements = screen.getAllByRole("listitem");
    expect(divElements).toHaveLength(1);
    const allFilter = screen.getByText("All");
    await userEvent.click(allFilter)
    divElements = screen.getAllByRole("listitem");
    expect(divElements).toHaveLength(3);
  })

  it("should not add an empty task", async() => {
    render(<Todo />);
    await addTasks([""]);
    const divElement = screen.queryByRole("listitem");
    expect(divElement).not.toBeInTheDocument();
  })

  it("should update items left after delete a todo", async()=> {
    render(<Todo />);
    await addTasks(["Task 1", "Task 2", "Task 3"]);
    const task1DeleteBttn = screen.getAllByLabelText("delete todo")[0];
    await userEvent.click(task1DeleteBttn);
    let task1 = screen.queryByText(/task 1/i);
    expect(task1).not.toBeInTheDocument();
    const activeTasksText = screen.getByText(/2 items left/i);
    expect(activeTasksText).toBeInTheDocument();
  })

});
