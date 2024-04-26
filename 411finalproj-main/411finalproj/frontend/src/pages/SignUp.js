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

const ContinueIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    class="bi bi-arrow-right-short"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
    />
  </svg>
);

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
            <HStack spacing="8px">
              <Text>Continue</Text>
              <ContinueIcon />
            </HStack>
          </Button>
        )}
        {page === 4 && (
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
