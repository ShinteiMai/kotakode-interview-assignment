import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { ListItem, Button } from "@chakra-ui/core";

export const taskPlaceholderValue = {
  unfocused: "Click here to add a task!",
  focused: "Add a task!",
};

const Todo = ({ updateTodo, deleteTodo, task, index }) => {
  const [placeholder, setPlaceholder] = useState(
    taskPlaceholderValue.unfocused
  );

  return (
    <ListItem>
      <Formik
        initialValues={{
          task,
        }}
        onSubmit={({ task }) => {
          updateTodo(index, task);
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              type="text"
              name="task"
              placeholder={placeholder}
              onFocus={() => {
                setPlaceholder(taskPlaceholderValue.focused);
              }}
              onBlur={() => {
                setPlaceholder(taskPlaceholderValue.unfocused);
              }}
            />
            <Button onClick={() => deleteTodo(index)}>Delete</Button>
          </form>
        )}
      </Formik>
    </ListItem>
  );
};

Todo.propTypes = {
  updateTodos: PropTypes.func,
  deleteTodo: PropTypes.func,
  task: PropTypes.string,
  index: PropTypes.number,
};

export default Todo;
