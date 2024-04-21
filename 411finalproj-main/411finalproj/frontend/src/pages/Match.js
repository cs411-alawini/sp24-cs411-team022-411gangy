//import React from 'react';
import { Box, Progress, VStack, Input, Text, Button, HStack, Link, Select } from '@chakra-ui/react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Logo from '../components/Logo';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import SignUp from './pages/SignUp';

function Match() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [genderPref, setGenderPref] = useState('');
  const [cuisinePref, setCuisinePref] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [allergies, setAllergies] = useState('');
  const [datelen, setDatelen] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [submitResult, setSubmitResult] = useState("Please fill out the information below!");
  //const history = useHistory();
  const [foundMatch, setFoundMatch] = useState(0);
  const rejectMatch = async(e) => {
    //come up with another match

  }
  const acceptMatch = async (e) => {
    e.preventDefault();
    try {
      //for some reason it needs the whole string...
      const response = await axios.post('http://localhost:3001/api/user_profile', {
        //"variables": here,
      });
      console.log(response.data);

      fetch("http://localhost:3001/api").then(
        response => response.json()).then(
          data => { // test to see if backend is sending data correctly to frontend
            if(data.email!="" && data.fname!="" && data.lname!="") {
                setShowOutput(true);
                setSubmitResult("Hello "+data.fname+" "+data.lname+"! You are user #"+data.userId);
            }
            else {
                setSubmitResult("please fill out your email address!");
            }
          // setName(data.data);
        }
      )
    } catch (error) {
      setSubmitResult("error while submitting information to the server!");
      console.error(error);
    }
    
  };
  
    useEffect(() => {
      
    } , []);
    return (
        // if found match, then display match, otherwise -show generating match
        <Box marginTop="100px" marginBottom="100px">
            <VStack spacing="24px">
                <Button type="submit" bgColor="red.600" color="white" width="320px" >Accept</Button>
                <Button type="submit" bgColor="red.600" color="white" width="320px" >Reject</Button>
            </VStack>
        </Box>
    );
};

export default Match;