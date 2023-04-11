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
import { EventFilter } from "../components/EventFilter";

const loader = async () => {
  const [eventsResponse, categoriesResponse] = await Promise.all([
    fetch("http://localhost:3000/events"),
    fetch("http://localhost:3000/categories"),
  ]);

  const [events, categories] = await Promise.all([
    eventsResponse.json(),
    categoriesResponse.json(),
  ]);

  return { events, categories };
};

const EventListItem = ({ event, categories }) => {
  return (
    <List key={event.id} borderBottomWidth="1px" borderColor="gray.200" pb="6">
      <Image src={event.image} alt={event.title} mb="4" borderRadius="md" />
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
  );
};

const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="6">
        Events List
      </Heading>
      <Center>
        <Box mb={"60px"} mt={"30px"} width={"50%"}>
          <Input
            bgGradient="linear(to-r, rgba(26, 32, 44, 0.7), rgba(26, 32, 44, 0.85))"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            borderColor={"gray.400"}
            placeholder={"Search Events.."}
            _placeholder={{ color: "gray.400" }}
            value={search}
            color={"white"}
            onChange={handleChange}
          ></Input>
          <EventFilter />
        </Box>
      </Center>
      <List spacing="6">
        {filteredEvents.map((event) => (
          <EventListItem key={event.id} event={event} categories={categories} />
        ))}
        <AddEvent />
        <ListItem borderBottomWidth="1px" borderColor="gray.200"></ListItem>
      </List>
    </Box>
  );
};

export { loader, EventsPage };
