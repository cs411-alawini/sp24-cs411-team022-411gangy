import React from "react";
import {
  Box,
  VStack,
  Text,
  Select,
} from "@chakra-ui/react";

const Page3 = ({ formData, handleChange }) => {
  return (
    <Box>
        <VStack spacing="16px">
          <VStack align="left" spacing="8px">
            <Text>Gender Identity</Text>
            <Select
              placeholder="Select a gender"
              size="md"
              width="320px"
              textColor="gray.500"
              focusBorderColor="red.500"
              cursor="pointer"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="all">Other</option>
            </Select>
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Gender Preference</Text>
            <Select
              placeholder="Select a gender"
              size="md"
              width="320px"
              textColor="gray.500"
              focusBorderColor="red.500"
              cursor="pointer"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="all">Any</option>
            </Select>
          </VStack>
      </VStack>
    </Box>
  );
};

export default Page3;