import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { Button, Box, Input, ButtonGroup } from "@chakra-ui/core";
import { AiFillSave } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import Dropdown from "react-dropdown";
import {
  submitTodoButtonComponent,
  newTodoComponent,
  taskFormComponent,
} from "../../utils/testConstants";

import "react-dropdown/style.css";
import Flags from "../Flags";
import { todoSchema } from "../../schema/taskSchema";

const priorityFlags = Flags();
const NewTodo = ({ createTodo, setIsAddingTodo }) => {
  return (
    <Formik
      initialValues={{ task: "", priority: 4 }}
      onSubmit={({ task, priority }) => {
        createTodo(task, priority);
        setIsAddingTodo(false);
      }}
      validationSchema={todoSchema}
    >
      {({ handleSubmit, errors, touched, setFieldValue, values }) => (
        <form data-testid={newTodoComponent} onSubmit={handleSubmit}>
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
                  data-testid={taskFormComponent}
                  placeholder="e.g. Wash dishes"
                  type="text"
                  name="task"
                  as={Input}
                />
                {errors.task && touched.task ? (
                  <Box
                    display="inline-block"
                    fontWeight="500"
                    color="red.500"
                    ml={4}
                    mt={2}
                  >
                    {errors.task}
                  </Box>
                ) : null}
              </Box>
              <Box mb={4}>
                <Dropdown
                  options={[1, 2, 3, 4]}
                  onChange={(option) => {
                    setFieldValue("priority", option.value);
                  }}
                  placeholder={priorityFlags[values.priority - 1]}
                />
                {errors.priority && touched.priority ? (
                  <Box
                    ml={4}
                    mt={2}
                    fontWeight="500"
                    display="inline-block"
                    color="red.500"
                  >
                    {errors.priority}
                  </Box>
                ) : null}
              </Box>
            </Box>
            <ButtonGroup>
              <Button
                data-testid={submitTodoButtonComponent}
                type="submit"
                leftIcon={AiFillSave}
                variantColor="yellow"
                variant="outline"
              >
                Add task
              </Button>
              <Button
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
