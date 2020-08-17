import React, { useState } from "react";
import Todolist from "./components/Todolist/Todolist";
import "./App.css";

const App = () => {
  const tasks = ["Cuci baju", "Masak nasi"];

  return (
    <div className="App">
      <h1>Pekerjaan Rumah Yang Perlu Dilakukan</h1>

      <Todolist tasks={tasks} />
    </div>
  );
};

export default App;
