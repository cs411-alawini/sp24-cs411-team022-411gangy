import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  let empty = {first_name:'', 
            last_name:'',
            email: '', 
            password: '', 
            confirm_password:'',
            gender_identity:'',
            gender_preference:'', 
            cuisine_preference: '', 
            max_budget: '',
            allergies: '',
            date_len: ''};
  const [formData, setFormData] = useState(empty);
  const [matches, setMatches] = useState([]);
  const submitData = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if(formData.password !== formData.confirm_password) {
        console.log("passwords don't match");
      } else {
      const response = await axios.post('http://localhost:3000/api/user_profile', {
          "fname": formData.first_name,
          "lname": formData.last_name,
          "email": formData.email,
          "pass": formData.password,
          "gender": formData.gender_identity,
          "genderPref": formData.gender_preference,
          "cuisinePref": formData.cuisine_preference,
          "maxBudget": formData.max_budget,
          "allergies": formData.allergies,
          "datelen": parseInt(formData.date_len,10)
        });
        setMatches(response.matches);//this should work? list of objects
        console.log(matches);
        localStorage.setItem("match_result", JSON.stringify({'matches': matches, 'userID': response.userID}));
        navigate('/match');
        
      }
    } catch(error) {
      console.log("error while submitting to server!");
    }
    //add data to the backend and retrieve the top matches...
    //how do I redirect to another page? also need to pass list as props
  }
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
          <Page1 formData={formData} setFormData={setFormData} handleChange={handleChange} />
        )}
        {page === 2 && (
          <Page2 formData={formData} setFormData={setFormData} handleChange={handleChange} />
        )}
        {page === 3 && (
          <Page3 formData={formData} setFormData={setFormData} handleChange={handleChange} />
        )}
        {page === 4 && (
          <Page4 formData={formData} setFormData={setFormData} handleChange={handleChange} />
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
            onClick={submitData}
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
