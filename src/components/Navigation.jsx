import { Link } from "react-router-dom";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav" bg="bg-surface" boxShadow="sm" h={"40px"}>
      <ul>
        <Flex margin={"20px"} justifyContent={"space-evenly"}>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/event/1">Event</Link>
          </li>
        </Flex>
      </ul>
    </Box>
  );
};
