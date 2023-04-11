import { Link } from "react-router-dom";
import React from "react";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav" bg="bg-surface" boxShadow="xl" h={"40px"}>
      <Flex margin={"15px"} justifyContent={"space-evenly"}>
        <List>
          <Link to="/">
            <Text
              fontFamily={"Poppins"}
              fontSize={"20px"}
              fontWeight={"bold"}
              _hover={{ color: "teal" }}
            >
              Events
            </Text>
            <ListItem borderBottomWidth="1px" borderColor="gray.200"></ListItem>
          </Link>
        </List>
        <List>
          <Link to="/event/1">
            <Text
              fontFamily={"Poppins"}
              fontSize={"20px"}
              fontWeight={"bold"}
              _hover={{ color: "teal" }}
            >
              Event
            </Text>
            <ListItem borderBottomWidth="1px" borderColor="gray.200"></ListItem>
          </Link>
        </List>
      </Flex>
    </Box>
  );
};
