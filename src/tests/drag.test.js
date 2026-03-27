
import { render, screen } from "@testing-library/react";
import Board from "../pages/Board";
import useTaskStore from "../store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("../store/store");

test("filters tasks by priority", () => {
  useTaskStore.mockReturnValue({
    tasks: [
      { id: "1", title: "Task 1", priority: "High", status: "To Do" },
      { id: "2", title: "Task 2", priority: "Low", status: "To Do" },
    ],
    filters: { priority: "High", assignee: "" },
  });

  render(
    <BrowserRouter>
      <Board />
    </BrowserRouter>
  );

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
});