import { Link } from "react-router-dom";
import React from "react";
import { Box, Flex, List } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav" bg="bg-surface" boxShadow="xl" h={"40px"}>
      <Flex margin={"15px"} justifyContent={"space-evenly"}>
        <List>
          <Link to="/">Events</Link>
        </List>
        <List>
          <Link to="/event/1">Event</Link>
        </List>
      </Flex>
    </Box>
  );
};
