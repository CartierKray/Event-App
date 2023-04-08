import React from "react";
import {
  Heading,
  Box,
  Text,
  Image,
  Flex,
  Tag,
  TagLeftIcon,
} from "@chakra-ui/react";

import { useLoaderData } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  return { event: await event.json(), categories: await categories.json() };
};

export const EventPage = () => {
  const { event, categories } = useLoaderData();
  return (
    <Box p={"6"}>
      <Heading as="h1" size="xl" mb="6">
        Event
      </Heading>
      <Box>
        <Image src={event.image} alt={event.title} mb="4" borderRadius="md" />
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
            {categories.map((category) => (
              <Box key={category.id}>
                <Tag color="blue.600" fontSize="sm" bg="blue.100">
                  <TagLeftIcon as={AiFillTags}></TagLeftIcon>
                  <Text textTransform={"uppercase"} fontSize={"10"}>
                    {" "}
                    {category.name}
                  </Text>
                </Tag>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
