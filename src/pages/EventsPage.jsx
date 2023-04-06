import { Heading, Image, Link, List, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  console.log(events);
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <div>
      <Heading>Events List</Heading>
      {events.map((event) => (
        <List key={event.id}>
          <Link to={"/event/:eventId"}></Link>
          <Heading>Title: {event.title}</Heading>
          <Text>Description: {event.description}</Text>
          <Image src={event.image} alt={event.image}></Image>
          <Text>Location : {event.location}</Text>
          <Text>StartTime : {event.startTime}</Text>
          <Text>Endtime : {event.endTime}</Text>
        </List>
      ))}
      {categories.map((categorie) => (
        <List key={categorie.id}>{categorie.name}</List>
      ))}
    </div>
  );
};
