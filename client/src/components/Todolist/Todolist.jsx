import React, { useState } from "react";
import PropTypes from "prop-types";

import { List, Button, Box } from "@chakra-ui/core";

import Todo from "./Todo";
import NewTodo from "./NewTodo";

import {
  todosComponent,
  todosContainerComponent,
  addButtonComponent,
  addTodoButtonComponent,
  newTodoComponent,
} from "../../utils/testConstants";

const Todolist = ({ tasks }) => {
  const [todos, setTodos] = useState(tasks);
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const createTodo = (task) => setTodos(todos.concat(task));

  const updateTodo = (index, task) => {
    const newTodos = [...todos];
    newTodos[index] = task;
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
        <List spacing={3} test={todosContainerComponent}>
          {todos.map((todo, index) => (
            <Todo
              test={todosComponent}
              key={index}
              updateTodos={updateTodo}
              deleteTodo={deleteTodo}
              task={todo}
              index={index}
            />
          ))}
        </List>
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
  tasks: PropTypes.arrayOf(PropTypes.string),
};

export default Todolist;
