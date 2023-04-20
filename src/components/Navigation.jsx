import { Link } from "react-router-dom";
import React from "react";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box
      as="nav"
      bg="bg-surface"
      boxShadow="md"
      h={"50px"}
      backgroundColor={"#948880"}
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      <Flex justifyContent={"space-evenly"} padding={"8px"}>
        <List>
          <Link to="/">
            <Text
              color={"white"}
              fontFamily={"Poppins"}
              fontSize={"20px"}
              fontWeight={"bold"}
              _hover={{ color: "gray.600" }}
            >
              Events List
            </Text>
            <ListItem borderBottomWidth="1px" borderColor="white"></ListItem>
          </Link>
        </List>
      </Flex>
    </Box>
  );
};
