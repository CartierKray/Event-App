import { Box, Button, Flex } from "@chakra-ui/react";

export const AddEvent = () => {
  return (
    <Box>
      <Flex justifyContent={"center"} color={"red"}>
        <Button
          backgroundColor={"blackAlpha.300"}
          _hover={{ backgroundColor: "grey", color: "lime" }}
        >
          Add Event!
        </Button>
      </Flex>
    </Box>
  );
};
