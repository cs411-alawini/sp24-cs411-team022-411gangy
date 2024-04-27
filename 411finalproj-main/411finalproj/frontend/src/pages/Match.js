//import React from "react";
import { Box, VStack, Button, Text, Card, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Logo from "../components/Logo";
import { Stars } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    width="16px"
    height="16px"
    viewBox="0 0 512 512"
  >
    <path
      d="M320 146s24.36-12-64-12a160 160 0 10160 160"
      fill="none"
      stroke="#C53030"
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width="32"
    />
    <path
      fill="none"
      stroke="#C53030"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M256 58l80 80-80 80"
    />
  </svg>
);

const Match = () => {
  //const location = useLocation();
  const [page, setPage] = useState(1);
  //const [matches,setMatches] = useState([]);
  //const otherIds = location.state.matches;
  //const userIdA = location.state.userID;
  const storedData = localStorage.getItem('match_result');
  const parsedData = JSON.parse(storedData);
  const otherIds = parsedData.matches;
  const userIdA = parsedData.userID;
 // const {otherIds, userIdA} = location.state;
  const [index, setIndex] = useState(0);

  const [userIdB, setUserIdB] = useState(otherIds[index]);
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [matchId, setMatchId] = useState(-1);
  const [topReview, setTopReview] = useState("");
  const [numStars, setNumStars] = useState(5);
  const get_data = async (e) => {
    //e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/create_match', {"userIdA": userIdA, "userIdB": userIdB});
      setMatchId(response.matchId);
      setRestaurantName(response.res_name);
      setDate(response.date);
      setTime(response.time);
      setNumStars(Math.round(response.avRating));
      setTopReview(response.topReview);
      setAddress(response.address);
    } catch(err) {console.error("failed making match");}
  }
  const accept_match = async (e) => {
    if(e)
    e.preventDefault();
    //also redirect
    try {
      const response = await axios.post('http://localhost:3000/api/create_match', {"userIdA": userIdA, "userIdB": userIdB});
      if(response.success == 1) {
        //then you go to next page w the info u have
      } else {
        setRestaurantName("failed accept match");
      }
    } catch(err) {setRestaurantName("failed accept match catch")};
  }
  const reject_match = async (e) => {
    if(e)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/delete_match', {"matchId": matchId}); //delete
      if(response.success == 1) {
        setIndex((index+1)%otherIds.length);
        setUserIdB(otherIds[index]);
        get_data(); //create next match
      } else {
        setRestaurantName("failed reject match");
      }
      
    } catch(err) {setRestaurantName("failed reject match catch")};
  }
  if(matchId == -1) { // first time - need to deal with it
    get_data();
  }
  

  return (
    <Box>
      <VStack
        spacing="24px"
        height="100vh"
        width="100vw"
        justifyContent="center"
      >
        <Logo />
        <Card
          borderWidth="1px"
          borderColor="gray.200"
          w="320px"
          h="320px"
          borderRadius="8px"
          shadow="none"
          padding="24px"
        >
          <VStack spacing="8px" align="flex-start">
            <Text fontSize="20px" fontWeight="extrabold">
              {userIdA}
            </Text>
            <VStack spacing="4px" align="flex-start">
              <Text fontSize="large" fontWeight="semibold">
                {date}, {time} @ {restaurantName}
              </Text>
              <Text fontSize="medium" fontWeight="medium">
                {address}
              </Text>
              <Text fontSize="medium">{topReview}</Text>
            </VStack>
            <HStack spacing="2px">
              {Array(numStars)
                .fill()
                .map((_, index) => (
                  <Stars
                    key={index}
                    style={{ width: "32px", height: "32px", color: "#C53030" }}
                  />
                ))}
              {Array(5 - numStars)
                .fill()
                .map((_, index) => (
                  <Stars
                    key={index}
                    style={{ width: "32px", height: "32px", color: "#CBD5E0" }}
                  />
                ))}
            </HStack>
          </VStack>
        </Card>
        <VStack spacing="16px">
          <Button
            color="white"
            width="320px"
            bgColor="red.600"
            _hover={{ bgColor: "red.700" }}
            onClick={accept_match}
          >
            Make a reservation
          </Button>
          <Button
            color="red.600"
            width="320px"
            bgColor="white"
            borderColor="red.600"
            borderWidth="1px"
            _hover={{ textDecoration: "underline" }}
            onClick={reject_match}
          >
            <HStack spacing="8px">
              <RefreshIcon />
              <Text>Refresh</Text>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Match;
