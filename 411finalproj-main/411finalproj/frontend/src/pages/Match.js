//import React from 'react';
import { Box, Progress, VStack, Input, Text, Button, HStack, Link, Select } from '@chakra-ui/react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Logo from '../components/Logo';
import {useLocation} from 'react-router-dom';
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
    //get information here
    
    const rejectMatch = async(e) => {
        //come up with another match
        

    }
    const acceptMatch = async (e) => {
        const state = useLocation();
        e.preventDefault();
        try {
        //for some reason it needs the whole string...
        const response = await axios.post('http://localhost:3001/api/user_match', {
            //"variables": here,
            "user_id": state.user
        });
        } catch (error) {
        setSubmitResult("error while submitting information to the server!");
        console.error(error);
        }
    
    };
  
    return (
        // if found match, then display match, otherwise -show generating match
        <Box marginTop="100px" marginBottom="100px">
            <VStack spacing="24px">
                <Button bgColor="red.600" color="white" width="320px" onClick={acceptMatch}>Accept</Button>
                <Button bgColor="red.600" color="white" width="320px" onClick={rejectMatch}>Reject</Button>
            </VStack>
        </Box>
    );
};

export default Match;