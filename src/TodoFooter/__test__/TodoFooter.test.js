import { render, screen } from "@testing-library/react";
import TodoFooter from "../TodoFooter";
import userEvent from "@testing-library/user-event";

describe("TodoFooter", () => {
  const defaultTodoFooterProps = {
    numOfActive: 5,
    onFilterChange: jest.fn(),
    onClearComplete: jest.fn(),
  };

  it("should display the correct number of active tasks left", () => {
    render(<TodoFooter {...defaultTodoFooterProps} numOfActive={5} />);

    const taskText = screen.getByText(/5 items left/i);
    expect(taskText).toBeInTheDocument();
  });

  it("should render 'task' when the number of incomplete task is one", () => {
    render(<TodoFooter {...defaultTodoFooterProps} numOfActive={1} />);

    const taskText = screen.getByText(/1 item left/i);
    expect(taskText).toBeInTheDocument();
  });

  it("should render 'task' when the number of incomplete task is zero", () => {
    render(<TodoFooter {...defaultTodoFooterProps} numOfActive={0} />);

    const taskText = screen.getByText(/0 item left/i);
    expect(taskText).toBeInTheDocument();
  });

  it("should render radio button for filter options", () => {
    render(<TodoFooter {...defaultTodoFooterProps} />);

    const allFilter = screen.getByRole("radio", { name: /all/i });
    const activeFilter = screen.getByRole("radio", { name: /active/i });
    const completedFilter = screen.getByRole("radio", {
      name: /completed/i,
    });

    expect(allFilter).toBeInTheDocument();
    expect(activeFilter).toBeInTheDocument();
    expect(completedFilter).toBeInTheDocument();
  });

  it("should have the 'All' filter selected by default", () => {
    render(<TodoFooter {...defaultTodoFooterProps} />);

    const allFilter = screen.getByRole("radio", { name: /all/i });
    expect(allFilter).toBeChecked();
  });

  it("should call onFilterChange with the correct filter value when a filter is selected", () => {
    const mockedOnFilterChange = jest.fn();
    render(
      <TodoFooter
        {...defaultTodoFooterProps}
        onFilterChange={mockedOnFilterChange}
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
        mockedOnFilterChange.mock.calls[
          mockedOnFilterChange.mock.calls.length - 1
        ][0].target.value,
      ).toBe(expectedValue);
    });
  });

  it("should render the 'Clear Completed' button", () => {
    render(<TodoFooter {...defaultTodoFooterProps} />);
    const clearButton = screen.getByRole("button", {
      name: /clear completed/i,
    });
    expect(clearButton).toBeInTheDocument();
  });

  it("should call onClearComplete when 'Clear Completed' button is clicked", () => {
    const mockedOnClearComplete = jest.fn();
    render(
      <TodoFooter
        {...defaultTodoFooterProps}
        onClearComplete={mockedOnClearComplete}
      />,
    );
    const clearButton = screen.getByRole("button", { name: /clear complete/i });
    userEvent.click(clearButton);
    expect(mockedOnClearComplete).toHaveBeenCalledTimes(1);
  });
});
