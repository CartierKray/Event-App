import React, { useState } from "react";
import {
  Heading,
  Box,
  Text,
  Image,
  Flex,
  Tag,
  Center,
  TagLeftIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { useLoaderData, useNavigate } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { onClose } = useDisclosure();
  const { users, event, categories } = useLoaderData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast({
          title: "Event Edited Successfully.",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
          onCloseComplete: () => {
            onClose();
            window.location.reload();
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error Event Not Edited. Try Again.",
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
          onCloseComplete: () => {
            onClose();
            window.location.reload();
          },
        });
      });
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Do you want to delete this event?")) {
      window.confirm("Are you 100% Sure? ");
      fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast({
            title: "Event deleted successfully.",
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Error Event Not Deleted. Try Again.",
            status: "error",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box
      p={"6"}
      minHeight={"100vh"}
      maxWidth={{ base: "100%", md: "680px" }}
      mx="auto"
    >
      <Heading as="h1" size="xl" mb="6">
        Event
      </Heading>
      <Box>
        <Image src={event.image} mb="4" borderRadius="md" />
        <Heading as="h2" size="md">
          {event.title}
        </Heading>
        <Text color="gray.500" fontSize="sm" mb="3" mt="1">
          Location: {event.location}
        </Text>
        <Text>{event.description}</Text>
        <Text color="gray.500" fontSize="sm" mt="3">
          Starts at: {new Date(event.startTime).toLocaleString()}
        </Text>
        <Text color="gray.500" fontSize="sm" mt="1">
          End at: {new Date(event.endTime).toLocaleString()}
        </Text>
        <Flex gap={2} color="gray.500" fontSize="sm" mt="3">
          Category:
          <Flex gap={2}>
            {categories
              .filter((category) => event.categoryIds.includes(category.id))
              .map((category) => (
                <Box key={category.id}>
                  <Tag color="white" fontSize="sm" bg="blue.400">
                    <TagLeftIcon as={AiFillTags}></TagLeftIcon>
                    <Text textTransform={"uppercase"} fontSize={"10"}>
                      {category.name}
                    </Text>
                  </Tag>
                </Box>
              ))}
          </Flex>
        </Flex>
        <Text color="gray.500" fontSize="sm" mt="1">
          Created By:
          {users.find((user) => user.id === event.createdBy)?.name}
        </Text>
        <Image
          src={users.find((user) => user.id === event.createdBy)?.image}
          borderRadius={"sm"}
        />

        <br />
        <Divider />
        <br />
        <Center>
          <Flex gap={3}>
            <Button
              color={"white"}
              backgroundColor={"teal.300"}
              onClick={() => setIsEditModalOpen(true)}
              _hover={{ bg: "limegreen" }}
            >
              Edit Event
            </Button>
            <Button
              color="white"
              backgroundColor={"red"}
              onClick={handleDeleteClick}
              _hover={{ color: "black" }}
            >
              Delete Event
            </Button>
          </Flex>
        </Center>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleEditSubmit}>
                <FormControl mb="4">
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={updatedEvent.title}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={updatedEvent.description}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Location</FormLabel>
                  <Input
                    type="text"
                    name="location"
                    value={updatedEvent.location}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="startTime"
                    value={updatedEvent.startTime}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="endTime"
                    value={updatedEvent.endTime}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Category</FormLabel>
                  <select
                    name="categoryIds"
                    multiple
                    value={updatedEvent.categoryIds}
                    onChange={handleInputChange}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <Button
                  type="submit"
                  backgroundColor={"teal.300"}
                  color={"white"}
                  _hover={{ bg: "limegreen" }}
                >
                  Save
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default EventPage;
