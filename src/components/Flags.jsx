import React from "react";

import { AiFillFlag } from "react-icons/ai";
import { Box } from "@chakra-ui/core";

const colors = ["red.500", "orange.300", "yellow.300", "green.400"];

const Flags = () => {
  const flagElements = colors.map((color, index) => (
    <Box key={index} as={AiFillFlag} color={color} />
  ));
  return flagElements;
};

export default Flags;
