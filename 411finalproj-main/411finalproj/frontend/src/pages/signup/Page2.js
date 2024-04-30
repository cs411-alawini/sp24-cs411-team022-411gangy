import React from "react";
import {
  Box,
  VStack,
  Input,
  Text,
} from "@chakra-ui/react";

const Page2 = ({ formData, setFormData, handleChange }) => {
  return (
    <Box>
        <VStack spacing="16px">
          <VStack align="left" spacing="8px">
            <Text>Password</Text>
            <Input placeholder="Enter password" size="md" width="320px" focusBorderColor="red.500"
            onChange={(event) => setFormData({ ...formData, password: event.target.value })} />
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Confirm Password</Text>
            <Input placeholder="Re-enter password" size="md" width="320px" focusBorderColor="red.500" 
            onChange={(event) => setFormData({ ...formData, confirm_password: event.target.value })} />
          </VStack>
      </VStack>
    </Box>
  );
};

export default Page2;