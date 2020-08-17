import React, { useState } from "react";
import Todolist from "./components/Todolist/Todolist";
import "./App.css";
import { Text, Box } from "@chakra-ui/core";
import moment from "moment";

const App = () => {
  const tasks = ["Cuci baju", "Masak nasi"];

  return (
    <div className="App">
      <Text fontSize="4xl">Housework 🧹</Text>
      <Text fontSize="xl">a dead simple to-do list for your daily needs.</Text>

      <Box>
        <Text>{moment().format("dddd, MMMM Do YYYY")}</Text>
        <Todolist tasks={tasks} />
      </Box>
    </div>
  );
};

export default App;
