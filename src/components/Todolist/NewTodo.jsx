import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { Button, Box, Input, ButtonGroup } from "@chakra-ui/core";
import { AiFillSave } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import Dropdown from "react-dropdown";
import {
  submitTodoButtonComponent,
  addTodoFormComponent,
} from "../../utils/testConstants";

import "react-dropdown/style.css";

const NewTodo = ({ createTodo, setIsAddingTodo }) => {
  const [isPriorityTouched, setIsPriorityTouched] = useState(false);

  return (
    <Formik
      initialValues={{ task: "", priority: 4 }}
      onSubmit={({ task, priority }) => {
        createTodo(task, priority);
        setIsAddingTodo(false);
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit} data-test={addTodoFormComponent}>
          <Box
            display="flex"
            flexDir="column"
            width="100%"
            alignItems="top"
            justifyContent="center"
          >
            <Box width={["60%", "50%", "40%"]}>
              <Box mb={4}>
                <Field
                  placeholder="e.g. Wash dishes"
                  type="text"
                  name="task"
                  as={Input}
                />
              </Box>
              <Box mb={4}>
                <Dropdown
                  options={[1, 2, 3, 4]}
                  onChange={(option) => {
                    setFieldValue("priority", option.value);
                    setIsPriorityTouched(true);
                  }}
                  placeholder={isPriorityTouched ? values.priority : "Priority"}
                />
              </Box>
            </Box>
            <ButtonGroup>
              <Button
                type="submit"
                leftIcon={AiFillSave}
                variantColor="yellow"
                variant="outline"
              >
                Add task
              </Button>
              <Button
                data-test={submitTodoButtonComponent}
                leftIcon={TiCancel}
                variantColor="red"
                variant="outline"
                onClick={() => setIsAddingTodo(false)}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Box>
        </form>
      )}
    </Formik>
  );
};

NewTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
  setIsAddingTodo: PropTypes.func.isRequired,
};

export default NewTodo;
