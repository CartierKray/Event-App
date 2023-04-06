import {
  Box,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Tag,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AddEventButton } from "../components/AddEventButton";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="6">
        Events List
      </Heading>
      <List spacing="6">
        {events.map((event) => (
          <ListItem
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
            <Text color="gray.500" fontSize="sm" mt="3">
              Category:
            </Text>
            <Flex>
              {categories.map((category) => (
                <Box key={category.id} mt="4">
                  <Tag
                    color="blue.500"
                    fontSize="sm"
                    bg="blue.100"
                    marginLeft={"5px"}
                  >
                    {category.name}
                  </Tag>
                </Box>
              ))}
            </Flex>
          </ListItem>
        ))}
        <AddEventButton />
      </List>
    </Box>
  );
};
