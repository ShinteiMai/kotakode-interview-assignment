import React, { useState } from "react";
import Todolist from "./components/Todolist/Todolist";
import "./App.css";
import { Text } from "@chakra-ui/core";

const App = () => {
  const tasks = ["Cuci baju", "Masak nasi"];

  return (
    <div className="App">
      <Text fontSize="5xl">Housework 🧹</Text>
      <Todolist tasks={tasks} />
    </div>
  );
};

export default App;
