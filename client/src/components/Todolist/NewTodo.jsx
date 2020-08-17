import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { Button } from "@chakra-ui/core";
import {
  submitTodoButtonComponent,
  addTodoFormComponent,
} from "../../utils/testConstants";

const NewTodo = ({ createTodo, setIsAddingTodo }) => (
  <Formik
    initialValues={{ task: "" }}
    onSubmit={({ task }) => {
      createTodo(task);
    }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit} data-test={addTodoFormComponent}>
        <Field placeholder="e.g. Wash dishes" type="text" name="task" />
        <Button
          data-test={submitTodoButtonComponent}
          onClick={() => setIsAddingTodo(false)}
        >
          Cancel
        </Button>
      </form>
    )}
  </Formik>
);

NewTodo.propTypes = {
  createTodo: PropTypes.func,
  setIsAddingTodo: PropTypes.func,
};

export default NewTodo;
