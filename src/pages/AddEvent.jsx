import {
  Button,
  FormLabel,
  Input,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { Form } from "react-router-dom";

export const AddEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent={"center"} color={"red"}>
        <Button
          onClick={onOpen}
          backgroundColor={"blackAlpha.300"}
          color={"red"}
          _hover={{ backgroundColor: "grey", color: "lime" }}
        >
          Add Event!
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Event Here !</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                name="text"
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
                name="Location"
              ></Input>
              <FormLabel
                mt="8"
                fontFamily={"fantasy"}
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Date & Start Time
              </FormLabel>
              <Input width={"300px"} name="date" type="datetime-local"></Input>
              <FormLabel
                mt="8"
                fontFamily={"fantasy"}
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Date & End time
              </FormLabel>
              <Input width={"300px"} name="date" type="datetime-local"></Input>
              <FormLabel
                mt="12"
                fontFamily={"fantasy"}
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Image
              </FormLabel>
              <Input
                placeholder={"Add event title.."}
                width={"300px"}
                type="file"
                name="image"
              ></Input>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"blackAlpha.300"}
              color={"red"}
              _hover={{ backgroundColor: "grey", color: "lime" }}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              backgroundColor={"blackAlpha.300"}
              color={"red"}
              _hover={{ backgroundColor: "grey", color: "lime" }}
              type="submit"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
