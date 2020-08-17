import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  ListItem,
  Button,
  Input,
  Box,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/core";
import { AiFillFlag, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";

export const taskPlaceholderValue = {
  unfocused: "Click here to add a task!",
  focused: "Add a task!",
};

const colors = ["red.500", "orange.300", "yellow.200", "green.400"];

const options = [1, 2, 3, 4];
const defaultOption = options[0];

const Todo = ({ updateTodo, deleteTodo, task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    taskPlaceholderValue.unfocused
  );

  let priorityColor;
  switch (task.priority) {
    case 1:
      priorityColor = colors[0];
      break;
    case 2:
      priorityColor = colors[1];
      break;
    case 3:
      priorityColor = colors[2];
      break;
    case 4:
      priorityColor = colors[3];

      break;
    default:
      priorityColor = colors[0];
  }

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
                  color={values.priority}
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
              <Box
                style={{
                  cursor: "pointer",
                }}
              >
                <Tooltip label={isEditing ? "Save task" : "Edit task"}>
                  <Box
                    as={isEditing ? AiOutlineClose : AiFillEdit}
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  />
                </Tooltip>
              </Box>
              {/* <Box>
                <Dropdown
                  options={options}
                  onChange={(selectedOption) => {
                    setFieldValue("priority", selectedOption);
                  }}
                  value={defaultOption}
                />
              </Box> */}
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
