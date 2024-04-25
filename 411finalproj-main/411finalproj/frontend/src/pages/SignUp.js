import React, { useState } from "react";
import {
  Box,
  Progress,
  VStack,
  Text,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import Logo from "../components/Logo";
import Page1 from "./login/Page1";
import Page2 from "./login/Page2";
import Page3 from "./login/Page3";
import Page4 from "./login/Page4";

const SignUp = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});

  const nextPage = () => setPage(page + 1);
  const handleChange = (data) => setFormData({ ...formData, ...data });

  return (
    <Box>
      <VStack
        spacing="24px"
        height="100vh"
        width="100vw"
        justifyContent="center"
      >
        <Logo />
        <Progress size="xs" value={(page / 4) * 100} width="320px" />
        {page === 1 && (
          <Page1 formData={formData} handleChange={handleChange} />
        )}
        {page === 2 && (
          <Page2 formData={formData} handleChange={handleChange} />
        )}
        {page === 3 && (
          <Page3 formData={formData} handleChange={handleChange} />
        )}
        {page === 4 && (
          <Page4 formData={formData} handleChange={handleChange} />
        )}
        {page < 4 && (
          <Button
            bgColor="red.600"
            _hover={{ bgColor: "red.700" }}
            color="white"
            width="320px"
            onClick={nextPage}
          >
            Next
          </Button>
        )}
        {page == 4 && (
          <Button
            bgColor="red.600"
            _hover={{ bgColor: "red.700" }}
            color="white"
            width="320px"
          >
            Submit
          </Button>
        )}
        <HStack>
          <Text textColor="gray.500">Already have an account?</Text>
          <Link>Log in</Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SignUp;
