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
  TagLeftIcon,
} from "@chakra-ui/react";
import { AddEventButton } from "../components/AddEventButton";
import { useLoaderData } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";

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

        <AddEventButton />

        <ListItem borderBottomWidth="1px" borderColor="gray.200"></ListItem>
      </List>
    </Box>
  );
};
