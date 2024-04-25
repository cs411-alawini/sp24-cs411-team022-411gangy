import React from "react";
import {
  Box,
  VStack,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";

const Page4 = ({ formData, handleChange }) => {
  return (
    <Box>
        <VStack spacing="16px">
          <VStack align="left" spacing="8px">
            <Text>Cuisine Preference</Text>
            <Select
              placeholder="Select a cuisine"
              size="md"
              width="320px"
              textColor="gray.500"
              focusBorderColor="red.500"
              cursor="pointer"
            >
              <option value="korean">Korean</option>
              <option value="japanese">Japanese</option>
              <option value="mexican">Mexican</option>
              <option value="american">American</option>
              <option value="italian">Italian</option>
              <option value="indian">Indian</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="chinese">Chinese</option>
              <option value="middle-eastern">Middle Eastern</option>
              <option value="thai">Thai</option>
              <option value="southern">Southern</option>
              <option value="french">French</option>
            </Select>
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Maximum Budget</Text>
            <Input placeholder="$0.00" size="md" width="320px" focusBorderColor="red.500" />
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Allergies</Text>
            <Select
              placeholder="Select allergies"
              size="md"
              width="320px"
              textColor="gray.500"
              focusBorderColor="red.500"
              cursor="pointer"
            >
              <option value="milk">Milk</option>
              <option value="kosher">Kosher</option>
              <option value="shellfish">Shellfish</option>
              <option value="halal">Halal</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="nuts">Nuts</option>
              <option value="soybeans">Soybeans</option>
              <option value="gluten">Gluten</option>
              <option value="nuts">Nuts</option>
            </Select>
          </VStack>
      </VStack>
    </Box>
  );
};

export default Page4;