import React from "react";
import Todolist from "./Todolist";

import { tasks } from "../../data/data.json";
// import { findComponent } from "../../utils/testUtils";
import {
  todosContainerComponent,
  todosComponent,
} from "../../utils/testConstants";

import { render } from "../../utils/testUtils.js";

const defaultProps = { tasks };

// const testSetup = (props = defaultProps) => {
//   const setupProps = { ...defaultProps, ...props };
//   return shallow(<Todolist {...setupProps} />);
// };

describe("Todolist CRUD functionality", () => {
  let todolistWrapper;

  beforeEach(() => {
    todolistWrapper = render(<Todolist tasks={tasks} />);
  });

  it("ables to render todos", () => {
    // const container = findComponent(todolistWrapper, todosContainerComponent);
    // expect(container.length).toBe(1);
    // const lists = findComponent(todolistWrapper, todosComponent);
    // expect(lists.length).toBe(tasks.length);
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
