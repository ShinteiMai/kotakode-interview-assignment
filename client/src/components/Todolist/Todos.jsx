import React from "react";
import PropTypes from "prop-types";

import { List, Box } from "@chakra-ui/core";

import Todo from "./Todo";

import {
  todosComponent,
  todosContainerComponent,
} from "../../utils/testConstants";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder } from "../../utils/reorder";

const Todos = ({ todos, setTodos, updateTodo, deleteTodo }) => {
  return (
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        if (!destination) return;

        setTodos(reorder(todos, source.index, destination.index));
      }}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={3}
            test={todosContainerComponent}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    mb={4}
                  >
                    <Todo
                      test={todosComponent}
                      key={index}
                      updateTodos={updateTodo}
                      deleteTodo={deleteTodo}
                      task={todo}
                      index={index}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

Todos.propTypes = {};

export default Todos;
