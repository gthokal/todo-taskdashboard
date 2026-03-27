
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../pages/TaskForm";
import useTaskStore from "../store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("../store/store");

test("creates a new task successfully", () => {
  const addTask = jest.fn();

  useTaskStore.mockReturnValue({
    tasks: [],
    addTask,
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  });

  render(
    <BrowserRouter>
      <TaskForm isEdit={false} />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "Test Task" },
  });

  fireEvent.click(screen.getByText(/save/i));

  expect(addTask).toHaveBeenCalled();
});