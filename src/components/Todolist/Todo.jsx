import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import Dropdown from "react-dropdown";
import { ListItem, Input, Box, Text } from "@chakra-ui/core";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";
import Flags from "../Flags";

import "react-dropdown/style.css";
import { todoSchema } from "../../schema/taskSchema";
import { todosComponent } from "../../utils/testConstants";

const colors = ["red.500", "orange.300", "yellow.300", "green.400"];
export const taskPlaceholderValue = {
  unfocused: "Click here to add a task!",
  focused: "Add a task!",
};

const priorityFlags = Flags();

const Todo = ({ updateTodo, deleteTodo, task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPriorityTouched, setIsPriorityTouched] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    taskPlaceholderValue.unfocused
  );

  return (
    <ListItem data-testid={todosComponent}>
      <Formik
        initialValues={{
          task: task.task,
          priority: task.priority,
        }}
        onSubmit={({ task, priority }) => {
          updateTodo(index, task, priority);
        }}
        validationSchema={todoSchema}
      >
        {({
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          submitForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              flexDir={isEditing ? ["column", "row"] : "row"}
            >
              <Box
                display="flex"
                alignItems="center"
                w={["100%", "60%", "50%"]}
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
                    <Box>
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
                    </Box>
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
                        isPriorityTouched
                          ? priorityFlags[values.priority - 1]
                          : "Priority"
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
                    onClick={() => {
                      if (isEditing) submitForm();
                      if (!errors.task && !errors.priority) {
                        setIsEditing(!isEditing);
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box ml={8}>
              {errors.task && touched.task ? (
                <Text color="red.500">{errors.task}</Text>
              ) : null}
              {errors.priority && touched.priority ? (
                <Text color="red.500">{errors.priority}</Text>
              ) : null}
            </Box>
          </form>
        )}
      </Formik>
    </ListItem>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Todo;
