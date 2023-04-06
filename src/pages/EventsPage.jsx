import { Heading, Image, ListItem, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  console.log(events);
  return { events: await events.json(), categories: categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <div>
      <Heading>Events List</Heading>
      {events.map((event) => (
        <ListItem key={event.id}>
          <Heading>Title: {event.title}</Heading>
          <Text>Description: {event.description}</Text>
          <Image src={event.image} alt={event.image}></Image>
          <Text>Location : {event.location}</Text>
          <Text>StartTime : {event.startTime}</Text>
          <Text>Endtime : {event.endTime}</Text>
        </ListItem>
      ))}
      {categories.map((categorie) => (
        <ListItem key={categorie.id}>{categorie.name}</ListItem>
      ))}
    </div>
  );
};
