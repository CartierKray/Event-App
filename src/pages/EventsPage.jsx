import { Heading } from "@chakra-ui/react";
import React from "react";
import { useLoaderData } from "react-router-dom";

const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <>
      <Heading>List of events</Heading>
    </>
  );
};
