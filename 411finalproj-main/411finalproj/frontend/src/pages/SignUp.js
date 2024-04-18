//import React from 'react';
import { Box, Progress, VStack, Input, Text, Button, HStack, Link, Select } from '@chakra-ui/react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Logo from '../components/Logo';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import SignUp from './pages/SignUp';

function SignUp() {
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


  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      //for some reason it needs the whole string...
      const response = await axios.post('http://localhost:3001/api/user_profile', {
        "fname": fname,
        "lname": lname,
        "email": email,
        "pass": pass,
        "gender": gender,
        "genderPref": genderPref,
        "cuisinePref": cuisinePref,
        "maxBudget": maxBudget,
        "allergies": allergies,
        "datelen": parseInt(datelen,10)
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
        <form onSubmit={submitFunc}>
        <Box marginTop="100px" marginBottom="100px">
            <VStack spacing="24px">
                <Logo />
                <Progress size="xs" value="20" width="320px" />
                <VStack spacing="16px">
                {showOutput && (<VStack align="left" spacing="8px">
                    <Text>
                        {submitResult}
                    </Text>
                </VStack>)}
                <VStack onChange={(e) => setFName(e.target.value)} align="left" spacing="8px">
                    <Text>First Name</Text>
                    <Input placeholder="Enter first name" size="md" width="320px" />
                </VStack>
                <VStack onChange={(e) => setLName(e.target.value)} align="left" spacing="8px">
                    <Text>Last Name</Text>
                    <Input placeholder="Enter last name" size="md" width="320px" />
                </VStack>
                <VStack onChange={(e) => setEmail(e.target.value)} align="left" spacing="8px">
                    <Text>Email</Text>
                    <Input placeholder="Enter email" size="md" width="320px" />
                </VStack>
                <VStack onChange={(e) => setPassword(e.target.value)} align="left" spacing="8px">
                    <Text>Password</Text>
                    <Input placeholder="Enter password" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Confirm Password</Text>
                    <Input placeholder="Re-enter password" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Gender Identity</Text>
                    <Select onChange={(e) => setGender(e.target.value)} placeholder='Select a gender' size="md" width="320px">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">All</option>
                    </Select>
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Gender Preference</Text>
                    <Select onChange={(e) => setGenderPref(e.target.value)} placeholder='Select a gender' size="md" width="320px">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">All</option>
                    </Select>
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Cuisine Preference</Text>
                    <Select onChange={(e) => setCuisinePref(e.target.value)} placeholder='Select a cuisine' size="md" width="320px">
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
                    <Input onChange={(e) => setMaxBudget(e.target.value)} placeholder="$0.00" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Preferred Date Length in Minutes</Text>
                    <Input onChange={(e) => setDatelen(e.target.value)} placeholder="45" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Allergies</Text>
                    <Select onChange={(e) => setAllergies(e.target.value)} placeholder='Select allergies' size="md" width="320px">
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
                <Button type="submit" bgColor="red.600" color="white" width="320px" >Submit</Button>
                <HStack>
                <Text>Already have an account?</Text>
                <Link>Log in</Link>
                </HStack>
            </VStack>
        </Box>
        </form>
    );
};

export default SignUp;