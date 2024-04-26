import React from "react";
import {
  Box,
  VStack,
  Input,
  Text,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import Logo from "../components/Logo";

const SignUp = () => {
  return (
    <Box>
      <VStack
        spacing="24px"
        height="100vh"
        width="100vw"
        justifyContent="center"
      >
        <Logo />
        <VStack spacing="16px">
          <VStack align="left" spacing="8px">
            <Text>Email</Text>
            <Input placeholder="Enter email" size="md" width="320px" focusBorderColor="red.500" />
          </VStack>
          <VStack align="left" spacing="8px">
            <Text>Password</Text>
            <Input placeholder="Enter password" size="md" width="320px" focusBorderColor="red.500" />
          </VStack>
        </VStack>
        <Button color="white" width="320px" bgColor="red.600" _hover={{bgColor: "red.700"}}>
          Login
        </Button>
        <HStack>
          <Text textColor="gray.500">Don't have an account?</Text>
          <Link>Create a profile</Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SignUp;
