import React from "react";
import { Box, VStack, Button, Text, Card, HStack } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { Stars } from "@mui/icons-material";

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    width="16px"
    height="16px"
    viewBox="0 0 512 512"
  >
    <path
      d="M320 146s24.36-12-64-12a160 160 0 10160 160"
      fill="none"
      stroke="#C53030"
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width="32"
    />
    <path
      fill="none"
      stroke="#C53030"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M256 58l80 80-80 80"
    />
  </svg>
);

const Match = () => {
  const date = "2/10";
  const time = "4:00 PM";
  const restaurantName = "Thursday Kitchen";
  const address = "424 E 9th St, New York, NY 10009";
  const topReview =
    "Casual spot for Korean cooking with French and Spanish influences, plus playful drinks and desserts.";
  const numStars = 5;

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
          <VStack spacing="8px" align="flex-start">
            <Text fontSize="20px" fontWeight="extrabold">
              Maria
            </Text>
            <VStack spacing="4px" align="flex-start">
              <Text fontSize="large" fontWeight="semibold">
                {date}, {time} @ {restaurantName}
              </Text>
              <Text fontSize="medium" fontWeight="medium">
                {address}
              </Text>
              <Text fontSize="medium">{topReview}</Text>
            </VStack>
            <HStack spacing="2px">
              {Array(numStars)
                .fill()
                .map((_, index) => (
                  <Stars
                    key={index}
                    style={{ width: "32px", height: "32px", color: "#C53030" }}
                  />
                ))}
              {Array(5 - numStars)
                .fill()
                .map((_, index) => (
                  <Stars
                    key={index}
                    style={{ width: "32px", height: "32px", color: "#CBD5E0" }}
                  />
                ))}
            </HStack>
          </VStack>
        </Card>
        <VStack spacing="16px">
          <Button
            color="white"
            width="320px"
            bgColor="red.600"
            _hover={{ bgColor: "red.700" }}
          >
            Make a reservation
          </Button>
          <Button
            color="red.600"
            width="320px"
            bgColor="white"
            borderColor="red.600"
            borderWidth="1px"
            _hover={{ textDecoration: "underline" }}
          >
            <HStack spacing="8px">
              <RefreshIcon />
              <Text>Refresh</Text>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Match;
