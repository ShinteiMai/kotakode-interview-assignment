import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import Dropdown from "react-dropdown";
import { ListItem, Input, Box, Text } from "@chakra-ui/core";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";

import "react-dropdown/style.css";

export const taskPlaceholderValue = {
  unfocused: "Click here to add a task!",
  focused: "Add a task!",
};

const colors = ["red.500", "orange.300", "yellow.300", "green.400"];

const Todo = ({ updateTodo, deleteTodo, task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPriorityTouched, setIsPriorityTouched] = useState(false);
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
        onSubmit={({ task, priority }) => updateTodo(index, task, priority)}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              flexDir={isEditing ? ["column", "row"] : "row"}
            >
              <Box
                display="flex"
                alignItems="center"
                w={["80%", "60%", "40%"]}
                mb={[3, 0]}
              >
                <Box>
                  <Box
                    style={{
                      cursor: "pointer",
                    }}
                    mr={2}
                    mb={1}
                    as={FaRegCircle}
                    color={colors[values.priority - 1]}
                    onClick={() => deleteTodo(index)}
                  />
                </Box>
                <Box display="flex" alignItems="center" mr={4} w="80%">
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
              </Box>
              <Box display="flex">
                {isEditing ? (
                  <Box ml={4}>
                    <Dropdown
                      options={[1, 2, 3, 4]}
                      onChange={(option) => {
                        setFieldValue("priority", option.value);
                        setIsPriorityTouched(true);
                      }}
                      placeholder={
                        isPriorityTouched ? values.priority : "Priority"
                      }
                    />
                  </Box>
                ) : null}
                <Box
                  style={{
                    cursor: "pointer",
                  }}
                  display="flex"
                  alignItems="center"
                  ml={4}
                >
                  <Box
                    size={5}
                    as={isEditing ? AiFillSave : AiFillEdit}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </Box>
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
