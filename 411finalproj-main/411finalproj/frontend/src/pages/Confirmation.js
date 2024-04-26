import React from "react";
import { Box, VStack, Button, Text, Card, Icon, HStack } from "@chakra-ui/react";
import Logo from "../components/Logo";

const ConfirmationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#C53030"
    class="bi bi-calendar-check"
    viewBox="0 0 16 16"
  >
    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
  </svg>
);

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    class="bi bi-arrow-left-short"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
    />
  </svg>
);

const Confirmation = () => {
  return (
    <Box>
      <VStack
        spacing="24px"
        height="100vh"
        width="100vw"
        justifyContent="center"
      >
        <Logo />
        <Card
          borderWidth="1px"
          borderColor="gray.200"
          w="320px"
          h="320px"
          borderRadius="8px"
          shadow="none"
          padding="24px"
        >
          <VStack
            spacing="16px"
            align="center"
            h="100%"
            justifyContent="center"
          >
            <Icon as={ConfirmationIcon} />
            <Text textAlign="center">Your reservation has been confirmed!</Text>
          </VStack>
        </Card>
        <VStack spacing="16px">
          <Button
            color="white"
            width="320px"
            bgColor="red.600"
            _hover={{ bgColor: "red.700" }}
          >
            <HStack spacing="8px">
              <BackIcon />
              <Text>Back to login</Text>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Confirmation;
