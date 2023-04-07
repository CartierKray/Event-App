import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { Form } from "react-router-dom";

export const AddEvent = () => {
  return (
    <Box p={"6"} mt={"6rem"}>
      <Center height={"100vh"}>
        <Heading as="h1" size="xl" mb="6">
          Add Your Event Here !
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
                placeholder={"Add event title.."}
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
                placeholder={"Add event location.."}
                width={"300px"}
                type="text"
              ></Input>
              <FormLabel
                mt="8"
                fontFamily={"fantasy"}
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Date & Start Time
              </FormLabel>
              <Input width={"300px"} type="datetime-local"></Input>
              <FormLabel
                mt="8"
                fontFamily={"fantasy"}
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Date & End time
              </FormLabel>
              <Input width={"300px"} type="datetime-local"></Input>
            </Form>

            <Center>
              <Button
                backgroundColor={"blackAlpha.300"}
                color={"red"}
                _hover={{ backgroundColor: "grey", color: "lime" }}
                mt="10"
                type="submit"
              >
                Submit !
              </Button>
            </Center>
          </Box>
        </Heading>
      </Center>
    </Box>
  );
};
