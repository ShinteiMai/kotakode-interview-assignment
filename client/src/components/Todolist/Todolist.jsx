import React, { useState } from "react";
import PropTypes from "prop-types";

import { List, Button } from "@chakra-ui/core";

import Todo from "./Todo";

const Todolist = ({ tasks }) => {
  const [todos, setTodos] = useState(tasks);

  const mutateTodos = (index, task) => {
    const newTodos = [...todos];
    newTodos[index] = task;
    setTodos(newTodos);
  };

  console.log(todos);

  return (
    <>
      <div>A todolist!</div>
      <div>
        <List spacing={3}>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              mutateTodos={mutateTodos}
              task={todo}
              index={index}
            />
          ))}
        </List>
      </div>
      <Button variantColor="teal" onClick={() => setTodos(todos.concat(""))}>
        Add a new task
      </Button>
    </>
  );
};

Todolist.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string),
};

export default Todolist;
