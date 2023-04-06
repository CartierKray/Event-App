import { Link } from "react-router-dom";
import React from "react";
import { Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Flex margin={"20px"} justifyContent={"space-evenly"}>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/event/1">Event</Link>
          </li>
        </Flex>
      </ul>
    </nav>
  );
};
