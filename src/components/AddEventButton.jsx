import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const AddEventButton = () => {
  return (
    <Box>
      <Flex justifyContent={"center"} color={"red"}>
        <Link to="/add/event">
          <Button
            backgroundColor={"blackAlpha.300"}
            _hover={{ backgroundColor: "grey", color: "lime" }}
          >
            Add Event!
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
