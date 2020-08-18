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

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const Todos = ({ todos, setTodos, updateTodo, deleteTodo }) => {
  return (
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        if (!destination) return;

        setTodos(reorder(todos, source.index, destination.index));
      }}
    >
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={todosContainerComponent}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <Box
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    mb={4}
                  >
                    <Todo
                      key={index}
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}
                      task={todo}
                      index={index}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

Todos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      priority: PropTypes.number.isRequired,
    })
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default Todos;
