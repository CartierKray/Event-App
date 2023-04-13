import {
  Box,
  Heading,
  Image,
  List,
  Input,
  Center,
  Tag,
  Text,
  Flex,
  TagLeftIcon,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { AiFillTags } from "react-icons/ai";
import { AddEvent } from "./AddEvent";
import { useState } from "react";

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

export const EventFilter = () => {
  return (
    <Center>
      <RadioGroup
        bgGradient="linear(to-r, rgba(16, 28, 37, 0.6), rgba(12, 19, 28, 0.90))"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
        borderColor={"gray.400"}
        padding={4}
        marginTop={6}
        marginBottom={6}
        color="gray.400"
        borderRadius={25}
      >
        <Stack>
          <Flex gap={8}>
            <Text>Filter: </Text>
            <Radio
              fontWeight={700}
              value="all"
              _checked={{ bg: "white", color: "#1A202C" }}
              _focus={{ boxShadow: "none" }}
            >
              All
            </Radio>
            <Radio
              value="1"
              _checked={{ bg: "white", color: "#1A202C" }}
              _focus={{ boxShadow: "none" }}
            >
              Sports
            </Radio>
            <Radio
              value="2"
              _checked={{ bg: "white", color: "#1A202C" }}
              _focus={{ boxShadow: "none" }}
            >
              Games
            </Radio>
          </Flex>
        </Stack>
      </RadioGroup>
    </Center>
  );
};

const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const filteredEvents = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .filter((event) => {
      if (selectedCategory === "all") {
        return true;
      }
      return event.categoryIds.includes(parseInt(selectedCategory));
    });

  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="6">
        Events List
      </Heading>
      <Center>
        <Box mb={"60px"} mt={"30px"} width={"50%"}>
          <Input
            bgGradient="linear(to-r, rgba(26, 32, 44, 0.6), rgba(26, 32, 44, 0.85))"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            borderColor={"gray.400"}
            placeholder={"Search Events.."}
            _placeholder={{ color: "gray.400" }}
            value={search}
            color={"white"}
            onChange={handleChange}
          />
          <RadioGroup
            bgGradient="linear(to-r, rgba(16, 28, 37, 0.6), rgba(12, 19, 28, 0.90))"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            borderColor={"gray.400"}
            padding={4}
            marginTop={6}
            marginBottom={6}
            color="gray.400"
            borderRadius={25}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <Stack>
              <Flex gap={2}>
                <Text>Filter:</Text>
                <Radio
                  fontWeight={700}
                  value="all"
                  _checked={{ bg: "white", color: "#1A202C" }}
                  _focus={{ boxShadow: "none" }}
                >
                  All
                </Radio>
                {categories.map((category) => (
                  <Radio
                    key={category.id}
                    value={category.id.toString()}
                    _checked={{ bg: "white", color: "#1A202C" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    {category.name}
                  </Radio>
                ))}
              </Flex>
            </Stack>
          </RadioGroup>
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
