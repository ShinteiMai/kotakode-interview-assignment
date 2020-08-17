import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import Dropdown from "react-dropdown";
import { ListItem, Input, Box, Text } from "@chakra-ui/core";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";

import "react-dropdown/style.css";

export const taskPlaceholderValue = {
  unfocused: "Click here to add a task!",
  focused: "Add a task!",
};

const colors = ["red.500", "orange.300", "yellow.300", "green.400"];

const Todo = ({ updateTodo, deleteTodo, task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    taskPlaceholderValue.unfocused
  );

  return (
    <ListItem>
      <Formik
        initialValues={{
          task: task.task,
          priority: task.priority,
        }}
        onSubmit={({ task, priority }) => {
          console.log(task);
          console.log(priority);
          updateTodo(index, task);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center">
              <Box display="flex" alignItems="center" ml={4}>
                <Box
                  style={{
                    cursor: "pointer",
                  }}
                  as={FaRegCircle}
                  color={colors[values.priority - 1]}
                  onClick={() => deleteTodo(index)}
                />
              </Box>
              <Box display="flex" alignItems="center" w="50%" mr={4}>
                {isEditing ? (
                  <Field
                    type="text"
                    name="task"
                    as={Input}
                    placeholder={placeholder}
                    onFocus={() => {
                      setPlaceholder(taskPlaceholderValue.focused);
                    }}
                    onBlur={() => {
                      setPlaceholder(taskPlaceholderValue.unfocused);
                    }}
                  />
                ) : (
                  <Box>
                    <Text>{values.task}</Text>
                  </Box>
                )}
              </Box>
              {isEditing ? (
                <Box>
                  <Dropdown
                    options={[1, 2, 3, 4]}
                    onChange={(option) => {
                      setFieldValue("priority", option.value);
                    }}
                    placeholder="Priority"
                  />
                </Box>
              ) : (
                <Box></Box>
              )}
              <Box></Box>
              <Box
                style={{
                  cursor: "pointer",
                }}
              >
                <Box
                  as={isEditing ? AiOutlineClose : AiFillEdit}
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                />
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </ListItem>
  );
};

Todo.propTypes = {
  updateTodos: PropTypes.func,
  deleteTodo: PropTypes.func,
  index: PropTypes.number,
};

export default Todo;
