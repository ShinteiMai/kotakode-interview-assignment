import React from "react";
import { Button } from "@chakra-ui/core";
import { shallow, render } from "enzyme";

import Todolist from "./Todolist";

import { tasks } from "../../data/data.json";
import { findComponent } from "../../utils/testUtils";
import {
  todosContainerComponent,
  todosComponent,
  addTodoButtonComponent,
  newTodoComponent,
} from "../../utils/testConstants";

const defaultProps = { tasks };

const testSetup = (props = defaultProps) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Todolist {...setupProps} />);
};

describe("Todolist CRUD functionality", () => {
  let todolistWrapper;
  let newTodoWrapper;

  beforeEach(() => {
    todolistWrapper = testSetup(tasks, <Todolist />);
    //   // newTodoWrapper = testSetp(_, "new-todo");
  });

  it("ables to render todos", () => {
    const container = findComponent(todolistWrapper, todosContainerComponent);
    expect(container.length).toBe(1);
    const lists = findComponent(todolistWrapper, todosComponent);
    expect(lists.length).toBe(tasks.length);
  });

  it("ables to add todo", () => {
    // const addTodoButton = findComponent(
    //   todolistWrapper,
    //   addTodoButtonComponent
    // );
  });

  it("ables to remove todo", () => {});

  it("ables to update todo", () => {});
});
