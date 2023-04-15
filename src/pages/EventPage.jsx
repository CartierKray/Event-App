import React, { useState } from "react";
import {
  Heading,
  Box,
  Text,
  Image,
  Flex,
  Tag,
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
} from "@chakra-ui/react";

import { useLoaderData } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, categories } = useLoaderData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsEditModalOpen(false);
  };

  return (
    <Box p={"6"} minHeight={"100vh"}>
      <Flex justifyContent={"space-between"}>
        <Heading as="h1" size="xl" mb="6">
          Event
        </Heading>
        <Button
          color={"white"}
          backgroundColor={"teal.300"}
          onClick={() => setIsEditModalOpen(true)}
          _hover={{ bg: "limegreen" }}
        >
          Edit
        </Button>
      </Flex>

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
                  <Tag color="teal.700" fontSize="sm" bg="teal.200">
                    <TagLeftIcon as={AiFillTags}></TagLeftIcon>
                    <Text textTransform={"uppercase"} fontSize={"10"}>
                      {category.name}
                    </Text>
                  </Tag>
                </Box>
              ))}
          </Flex>
        </Flex>
        <br />
        <Divider />
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
                    value={new Date(updatedEvent.startTime).toISOString()}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="endTime"
                    value={new Date(updatedEvent.endTime).toISOString()}
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
