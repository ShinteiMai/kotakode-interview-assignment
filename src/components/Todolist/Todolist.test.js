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
} from "../../utils/testConstants";

const defaultProps = { tasks };

describe("Todolist CRUD functionality", () => {
  it("should shallow render correctly", async () => {
    const wrapper = shallow(<Todolist {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should be able to render correctly", async () => {
    const { getByTestId } = render(
      <ThemeProvider value={theme}>
        <GlobalStyle />
        <Todolist {...defaultProps} />
      </ThemeProvider>
    );

    expect(getByTestId(addTodoButtonComponent)).toBeInTheDocument();
  });

  it("should able to render todos correctly", async () => {
    const { getByTestId, getAllByTestId } = render(
      <ThemeProvider value={theme}>
        <GlobalStyle />
        <Todolist {...defaultProps} />
      </ThemeProvider>
    );

    expect(getByTestId(todosContainerComponent)).toBeInTheDocument();
    expect(getAllByTestId(todosComponent)).toHaveLength(tasks.length);
  });

  it("should be able to add a new todo", async () => {
    const data = {
      task: "Workout",
      priority: 2,
    };

    const { getByTestId, queryByTestId, getAllByTestId } = render(
      <ThemeProvider value={theme}>
        <GlobalStyle />
        <Todolist {...defaultProps} />
      </ThemeProvider>
    );

    expect(queryByTestId(newTodoComponent)).not.toBeInTheDocument();

    expect(getByTestId(addTodoButtonComponent)).toBeInTheDocument();
    fireEvent.click(getByTestId(addTodoButtonComponent));
    await waitFor(() => getByTestId(newTodoComponent));

    expect(getByTestId(newTodoComponent)).toBeInTheDocument();

    expect(getByTestId(taskFormComponent)).toBeInTheDocument();
    const taskForm = getByTestId(taskFormComponent);
    fireEvent.change(taskForm, { target: { value: data.task } });

    expect(getByTestId(submitTodoButtonComponent)).toBeInTheDocument();
    fireEvent.click(getByTestId(submitTodoButtonComponent));

    await waitFor(() => getAllByTestId(todosComponent));
    expect(queryByTestId(newTodoComponent)).not.toBeInTheDocument();
    expect(queryByTestId(addTodoButtonComponent)).toBeInTheDocument();
    expect(getAllByTestId(todosComponent)).toHaveLength(tasks.length + 1);
  });

  it("should be abled to delete a todo", async () => {});

  it("should be able to update a todo", async () => {});
});
