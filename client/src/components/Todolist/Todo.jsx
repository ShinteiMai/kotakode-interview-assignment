import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { ListItem } from "@chakra-ui/core";

export const taskPlaceholderValue = {
  unfocused: "Click here to add a task!",
  focused: "Add a task!",
};

const Todo = ({ mutateTodos, task, index }) => {
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
          mutateTodos(index, task);
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
          </form>
        )}
      </Formik>
    </ListItem>
  );
};

Todo.propTypes = {
  mutateTodos: PropTypes.func,
  task: PropTypes.string,
  index: PropTypes.number,
};

export default Todo;
