import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { Form } from "react-router-dom";

export const AddEvent = () => {
  return (
    <Box p={"6"}>
      <Heading as="h1" size="xl" mb="6">
        Add Events
        <Box height={"100vh"}>
          <Form>
            <FormLabel
              mt="12"
              fontFamily={"fantasy"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Title
            </FormLabel>
            <Input
              placeholder={"Add the event title.."}
              width={"300px"}
              type="text"
            ></Input>
            <FormLabel
              mt="8"
              fontFamily={"fantasy"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Location
            </FormLabel>
            <Input
              placeholder={"Add the event location.."}
              width={"300px"}
              type="text"
            ></Input>
            <FormLabel
              mt="8"
              fontFamily={"fantasy"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Date & Time Start
            </FormLabel>
            <Input width={"300px"} type="datetime-local"></Input>
            <FormLabel
              mt="8"
              fontFamily={"fantasy"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Date & Time End
            </FormLabel>
            <Input width={"300px"} type="datetime-local"></Input>
          </Form>
          <Button
            backgroundColor={"blackAlpha.300"}
            color={"red"}
            _hover={{ backgroundColor: "grey", color: "lime" }}
            mt="10"
            type="submit"
          >
            Submit !
          </Button>
        </Box>
      </Heading>
    </Box>
  );
};
