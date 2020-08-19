import React from "react";
import { GlobalStyle } from "@chakra-ui/system";
import { theme, ThemeProvider } from "@chakra-ui/core";
import { shallow } from "enzyme";
import { render, fireEvent, waitFor } from "@testing-library/react";

import Todolist from "./Todolist";

import { tasks } from "../../data/data.json";
import {
  todosComponent,
  addTodoButtonComponent,
  todosContainerComponent,
  newTodoComponent,
  taskFormComponent,
  submitTodoButtonComponent,
  deleteTodoButtonComponent,
  updateTodoButtonComponent,
  updateTaskFormComponent,
} from "../../utils/testConstants";

const defaultProps = { tasks };
const data = {
  task: "Workout",
  priority: 2,
};

describe("Todolist CRUD functionality", () => {
  let container;

  beforeEach(() => {
    container = render(
      <ThemeProvider value={theme}>
        <GlobalStyle />
        <Todolist {...defaultProps} />
      </ThemeProvider>
    );
  });

  it("should shallow render correctly", async () => {
    const wrapper = shallow(<Todolist {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should be able to render correctly", async () => {
    expect(container.getByTestId(addTodoButtonComponent)).toBeInTheDocument();
  });

  it("should able to render todos correctly", async () => {
    expect(container.getByTestId(todosContainerComponent)).toBeInTheDocument();
    expect(container.getAllByTestId(todosComponent)).toHaveLength(tasks.length);
  });

  it("should be able to add a new todo", async () => {
    expect(container.queryByTestId(newTodoComponent)).not.toBeInTheDocument();

    expect(container.getByTestId(addTodoButtonComponent)).toBeInTheDocument();
    fireEvent.click(container.getByTestId(addTodoButtonComponent));
    await waitFor(() => container.getByTestId(newTodoComponent));

    expect(container.getByTestId(newTodoComponent)).toBeInTheDocument();

    expect(container.getByTestId(taskFormComponent)).toBeInTheDocument();
    const taskForm = container.getByTestId(taskFormComponent);
    fireEvent.change(taskForm, { target: { value: data.task } });

    expect(
      container.getByTestId(submitTodoButtonComponent)
    ).toBeInTheDocument();
    fireEvent.click(container.getByTestId(submitTodoButtonComponent));

    await waitFor(() => container.getAllByTestId(todosComponent));
    expect(container.queryByTestId(newTodoComponent)).not.toBeInTheDocument();
    expect(container.queryByTestId(addTodoButtonComponent)).toBeInTheDocument();
    expect(container.getAllByTestId(todosComponent)).toHaveLength(
      tasks.length + 1
    );
  });

  it("should be abled to delete/finish a todo", async () => {
    expect(container.getAllByTestId(deleteTodoButtonComponent)).toHaveLength(
      tasks.length
    );
    const deleteButton = container.getAllByTestId(deleteTodoButtonComponent)[0];
    fireEvent.click(deleteButton);
    await waitFor(() => container.getAllByTestId(todosComponent));
    expect(container.getAllByTestId(todosComponent)).toHaveLength(
      tasks.length - 1
    );
  });

  it("should be able to update a todo", async () => {
    let oldValue;
    let updatedValue = "My task was changed, omg!";
    expect(container.getAllByTestId(updateTodoButtonComponent)).toHaveLength(
      tasks.length
    );
    const updateButton = container.getAllByTestId(updateTodoButtonComponent)[0];
    fireEvent.click(updateButton);
    await waitFor(() => container.getAllByTestId(todosComponent));

    oldValue = container.getAllByTestId(updateTaskFormComponent)[0].value;
    console.log(`oldValue: ${oldValue}`);
    fireEvent.change(container.getAllByTestId(updateTaskFormComponent)[0], {
      target: { value: updatedValue },
    });

    await waitFor(() => container.getAllByTestId(todosComponent));

    fireEvent.click(updateButton);
    await waitFor(() => container.getAllByTestId(todosComponent));

    expect(container.getAllByTestId(todosComponent)).toHaveLength(tasks.length);
    expect(container.getAllByTestId(updateTaskFormComponent)[0].value).toBe(
      updatedValue
    );
  });
});
