import {
  Box,
  Heading,
  Image,
  List,
  ListItem,
  Input,
  Center,
  Tag,
  Text,
  Flex,
  TagLeftIcon,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";
import { AddEvent } from "./AddEvent";
import { useState } from "react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const { search, setSearch } = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="6">
        Events List
      </Heading>
      <Center>
        <Box mb={"60px"} mt={"30px"} width={"50%"}>
          <Input
            placeholder={"Search Events.."}
            value={search}
            onChange={handleChange}
          ></Input>
        </Box>
      </Center>

      <List spacing="6">
        {events.map((event) => (
          <List
            key={event.id}
            borderBottomWidth="1px"
            borderColor="gray.200"
            pb="6"
          >
            <Image
              src={event.image}
              alt={event.title}
              mb="4"
              borderRadius="md"
            />
            <Link to={`/event/${event.id}`}>
              <Heading as="h2" size="md">
                {event.title}
              </Heading>
            </Link>
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
          </List>
        ))}

        <AddEvent />

        <ListItem borderBottomWidth="1px" borderColor="gray.200"></ListItem>
      </List>
    </Box>
  );
};
