import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { Button, Box, Input } from "@chakra-ui/core";
import {
  submitTodoButtonComponent,
  addTodoFormComponent,
} from "../../utils/testConstants";

const NewTodo = ({ createTodo, setIsAddingTodo }) => (
  <Formik
    initialValues={{ task: "" }}
    onSubmit={({ task }) => {
      createTodo(task);
      setIsAddingTodo(false);
    }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit} data-test={addTodoFormComponent}>
        <Box display="flex" alignItems="top" mx="auto" justifyContent="center">
          <Box>
            <Field
              placeholder="e.g. Wash dishes"
              type="text"
              name="task"
              as={Input}
            />
            <Button type="submit">Add task</Button>
          </Box>
          <Button
            data-test={submitTodoButtonComponent}
            onClick={() => setIsAddingTodo(false)}
          >
            Cancel
          </Button>
        </Box>
      </form>
    )}
  </Formik>
);

NewTodo.propTypes = {
  createTodo: PropTypes.func,
  setIsAddingTodo: PropTypes.func,
};

export default NewTodo;
