import React, { useState } from "react";
import PropTypes from "prop-types";

import moment from "moment";

import { Text, Button, Box, Divider } from "@chakra-ui/core";
import { AiOutlinePlus } from "react-icons/ai";

import NewTodo from "./NewTodo";
import Todos from "./Todos";

const Todolist = ({ tasks }) => {
  const [todos, setTodos] = useState(
    tasks.map((task, index) => {
      return {
        id: `item-${index}`,
        task: task.task,
        priority: task.priority,
      };
    })
  );
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const createTodo = (task, priority) =>
    setTodos(todos.concat({ id: `item-${todos.length + 1}`, task, priority }));

  const updateTodo = (index, task, priority) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], task, priority };
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <Box mb={6}>
        <Text fontWeight={600} fontSize={["1xl", "2xl"]}>
          {moment().format("dddd, MMMM Do YYYY")}
        </Text>
        {isAddingTodo ? (
          <NewTodo createTodo={createTodo} setIsAddingTodo={setIsAddingTodo} />
        ) : (
          <Button
            leftIcon={AiOutlinePlus}
            variantColor="yellow"
            variant="outline"
            onClick={() => setIsAddingTodo(true)}
          >
            Add task
          </Button>
        )}
      </Box>
      <Divider opacity={0.3} />
      <Box minHeight={64}>
        <Todos
          todos={todos}
          setTodos={setTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </Box>
    </>
  );
};

Todolist.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      priority: PropTypes.number.isRequired,
    })
  ),
};

export default Todolist;
