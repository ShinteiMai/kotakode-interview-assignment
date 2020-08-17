import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Box } from "@chakra-ui/core";

import {
  addTodoButtonComponent,
  newTodoComponent,
} from "../../utils/testConstants";

import NewTodo from "./NewTodo";
import Todos from "./Todos";

const Todolist = ({ tasks }) => {
  const [todos, setTodos] = useState(
    tasks.map((task, index) => {
      return {
        id: `item-${index}`,
        task,
        priority: 1,
      };
    })
  );
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const createTodo = (task) =>
    setTodos(todos.concat({ id: `item-${todos.length + 1}`, task }));

  const updateTodo = (index, task) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], task };
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <Box mx="auto" my={10}>
        <Todos
          todos={todos}
          setTodos={setTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </Box>
      {isAddingTodo ? (
        <NewTodo
          test={newTodoComponent}
          createTodo={createTodo}
          setIsAddingTodo={setIsAddingTodo}
        />
      ) : (
        <Button
          test={addTodoButtonComponent}
          variantColor="teal"
          onClick={() => setIsAddingTodo(true)}
        >
          Add a task
        </Button>
      )}
    </>
  );
};

Todolist.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Todolist;
