import React from "react";
import Todolist from "./components/Todolist/Todolist";
import { Text, Box } from "@chakra-ui/core";

import { tasks } from "./data/data.json";
import Emoji from "./components/Emoji";

const App = () => {
  return (
    <Box mx="auto" px={[8, 24, 56]}>
      <Box mb={[12, 16, 24]}>
        <Text fontSize="4xl">
          Housework <Emoji symbol="🧹" label="emoji" />
        </Text>
        <Text fontSize="lg">
          a dead simple to-do list for your daily needs.
        </Text>
      </Box>
      <Box>
        <Todolist tasks={tasks} />
      </Box>
    </Box>
  );
};

export default App;
