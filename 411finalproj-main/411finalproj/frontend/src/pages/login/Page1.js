import React from "react";
import {
  Box,
  VStack,
  Input,
  Text,
} from "@chakra-ui/react";

const Page1 = ({ formData, handleChange }) => {
  return (
    <Box>
        <VStack spacing="16px">
          <VStack align="left" spacing="8px">
            <Text>First Name</Text>
            <Input placeholder="Enter first name" size="md" width="320px" focusBorderColor="red.500" />
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Last Name</Text>
            <Input placeholder="Enter last name" size="md" width="320px" focusBorderColor="red.500" />
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Email</Text>
            <Input placeholder="Enter email" size="md" width="320px" focusBorderColor="red.500" />
          </VStack>
      </VStack>
    </Box>
  );
};

export default Page1;