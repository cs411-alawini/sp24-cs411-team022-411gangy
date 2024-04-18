import React from 'react';
import { Box, Progress, VStack, Input, Text, Button, HStack, Link, Select } from '@chakra-ui/react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Logo from '../components/Logo';

const SignUp = () => {
    return (
        <Box marginTop="100px" marginBottom="100px">
            <VStack spacing="24px">
                <Logo />
                <Progress size="xs" value="20" width="320px" />
                <VStack spacing="16px">
                <VStack align="left" spacing="8px">
                    <Text>First Name</Text>
                    <Input placeholder="Enter first name" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Last Name</Text>
                    <Input placeholder="Enter last name" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Email</Text>
                    <Input placeholder="Enter email" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Password</Text>
                    <Input placeholder="Enter password" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Confirm Password</Text>
                    <Input placeholder="Re-enter password" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Gender Identity</Text>
                    <Select placeholder='Select a gender' size="md" width="320px">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">All</option>
                    </Select>
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Gender Preference</Text>
                    <Select placeholder='Select a gender' size="md" width="320px">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">All</option>
                    </Select>
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Cuisine Preference</Text>
                    <Select placeholder='Select a cuisine' size="md" width="320px">
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
                    <Input placeholder="$0.00" size="md" width="320px" />
                </VStack>
                <VStack align="left" spacing="8px">
                    <Text>Allergies</Text>
                    <Select placeholder='Select allergies' size="md" width="320px">
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
                <Button bgColor="red.600" color="white" width="320px" >Submit</Button>
                <HStack>
                <Text>Already have an account?</Text>
                <Link>Log in</Link>
                </HStack>
            </VStack>
        </Box>
    );
};

export default SignUp;